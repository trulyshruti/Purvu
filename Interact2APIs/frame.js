

(function () {
    initMyBookmarklet();
    requestData();
    function requestData() {
        $.getJSON('http://localhost/Hacker%20League/HackNY-Fall2012/Interact2APIs/keywords.html', {
                text:$("#body").html()  },
            jsonReceive);
    }

    function jsonReceive(data) {
        var keyWord = data.keywords.join(" ");
        $.getJSON("http://api.newscred.com/stories", {
            cluster_size:10,
            access_key:"c4bcc3f7c9bf9ec159f51da0a86ca658",
            query:keyWord,
            format:"json"
        }, function (data) {
            var newsCongtainer = $("#news");
            $.each(data.story_set, function (index, story) {
                var article = story.article_set[0];
                newsCongtainer.append('<li class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-li-has-thumb ui-btn-up-c"><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a href="' + article.link + '" class="ui-link-inherit" target="main"><h3 class="ui-li-heading">' + article.title + '</h3><div class="ui-li-desc">' + article.description + '</div></a></div></div></li>');
//                newsCongtainer.append('<li><a href="' + article.link + '" target="main">' + article.title + '</a><div class="test" style="text-overflow: ellipsis; -o-text-overflow: ellipsis; -icab-text-overflow: ellipsis; -khtml-text-overflow: ellipsis; -moz-text-overflow: ellipsis; -webkit-text-overflow: ellipsis; ">' + article.description + '</div></li>');
            });
        });
        $.getJSON("http://search.twitter.com/search.json?callback=?", {
            count:10,
            q:keyWord
        }, function (data) {
            var twitterCongtainer = $("#twitter");
            $.each(data.results, function (index, twitter) {
                twitterCongtainer.append('<li>'+ twitter.text + '</li>');
            });
        });
        var app = app || {};
        app.SearchResults = new Behance.SearchCollection();
        app.SearchResults.fetch({
            data:{
                search:keyWord
            },
            success:function (model, resp) {
                var behanceCongtainer = $("#Behance");
                $.each(resp.projects, function (index, project) {
                    behanceCongtainer.append('<li><a href="' + project.url + '" target="main">' + project.name + '</a></li>');
                });
            }
        });
    }

    function initMyBookmarklet() {
        (window.myBookmarklet = function () {
            var loc = window.location;
            if ($("#mainframe").length == 0) {

                $("body").append("\
								<div id='overlay' style='background:#161616;position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:50;opacity:.7;'></div> \
                                <div id='mainframe_bar' style='background: #fff; padding: 10px 5px 10px 5px; position: fixed; top: 0px; right: 0%; width: 18%; height: 100%; z-index: 999; box-shadow:-5px 0px 5px purple; -moz-box-shadow:-5px 2px 5px purple;'>\
                                    <div id='mainframe_close' style=''>\
                                        <p><a href=\"#\">Close</a></p>\
                                    </div><div><div><div>News</div><ul id=\"news\"></ul></div><div><div>Twitter</div>\
                                    <ul id=\"twitter\"></ul></div><div><div>Behance</div><ul id=\"Behance\"></ul></div></div></div>\
                                </div>\
								<div id='mainframe_close' style=''>\
                                        <p><a href=\"#\">X</a></p>\
                                    </div>\
                                <div id='mainframe'>\
                                        <iframe src='" + loc + "' onload=\"$('#mainframe iframe').slideDown(500);\" name='main'>Enable iFrames.</iframe>\
                                        <style type='text/css'>\
                                                #mainframe_close { background: #fff; display: none; position: fixed; right: 20%; height: 20px; top: -20px; cursor: pointer; z-index: 1000; }\
                                                #mainframe_close p { background: #ddd; color: black; font: normal normal bold 20px/20px Helvetica, sans-serif; text-align: center; }\
                                                #mainframe iframe { background: #fff; display: none; position: fixed; top: 0px; left: 0px; width: 80%; height: 100%; overflow-y:auto; z-index: 999; box-shadow:3px 0px 10px purple;-moz-box-shadow:2px 0px 5px purple;}\\n\
                                        </style>\
                                </div>");
                $("#mainframe_close").fadeIn(750);
            } else {
				$("#overlay").fadeOut(500);
                $("#mainframe_close").fadeOut(750);
                $("#mainframe iframe").slideUp(500);
                $("#mainframe_bar iframe").slideUp(500);
                setTimeout("$('#mainframe').remove()", 750);
            }
            $("#mainframe_close").click(function (event) {
				$("#overlay").fadeOut(500);
                $("#mainframe_close").fadeOut(750);
                $("#mainframe iframe").slideUp(500);
                $("#mainframe_bar iframe").slideUp(500);
                setTimeout("$('#mainframe').remove()", 750);
                setTimeout("$('#mainframe_bar').remove()", 750);
            });
        })();
    }

})();