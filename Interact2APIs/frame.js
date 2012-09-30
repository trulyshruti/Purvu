(function(){

	// the minimum version of jQuery we want
	var v = "1.3.2";

	// check for jQuery. if it exists, verify it's not too old.
	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				initMyBookmarklet();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		initMyBookmarklet();
	}
        
        function requestData(){
            $.getJSON('http://localhost:8888/service.php', jsonReceive);
        }
        
        function jsonReceive(data){
            $("#mainframe_bar").html(data);
        }
        
	function initMyBookmarklet() {
		(window.myBookmarklet = function() {
			var loc = window.location;
                        
			if ($("#mainframe").length == 0) {

                                $("body").append("\
                                <style type='text/css'>\
                                                #mainframe_close { background: #fff; display: none; position: fixed; width: 50px; height: 20px; top: 0; left: 0; background-color: rgba(255,255,255,.25); cursor: pointer; z-index: 1000; }\
                                                #mainframe_close p { background: red; color: black; font: normal normal bold 20px/20px Helvetica, sans-serif; position: absolute; top: 0%; right: 0%;  text-align: center; }\
                                                #mainframe iframe { background: #fff; display: none; position: fixed; top: 0%; left: 0%; width: 80%; height: 100%; z-index: 999; border: 0px solid rgba(0,0,0,.5); }\
                                        </style>\
                                <div id='mainframe_bar' style='background: #fff;  position: fixed; top: 0%; left: 80%; width: 20%; height: 100%; z-index: 999; border: 10px solid rgba(0,0,0,.5);'>\
                                    <div id='mainframe_close' style=''>\
                                        <p><a href=\"#\">Close</a></p>\
                                    </div>\
                                </div>\
                                <div id='mainframe'>\
                                        <iframe src='"+loc+"' onload=\"$('#mainframe iframe').slideDown(500);\">Enable iFrames.</iframe>\
                                </div>\
                            ");
                                $("#mainframe_close").fadeIn(750);
                                
			} else {
				$("#mainframe_close").fadeOut(750);
				$("#mainframe iframe").slideUp(500);
                                $("#mainframe_bar").slideUp(500);
			}
			$("#mainframe_close").click(function(event){
				$("#mainframe_close").fadeOut(750);
				$("#mainframe iframe").slideUp(500);
                                $("#mainframe_bar").slideUp(500);
			});
                        requestData();
		})();
	}

})();