
// Call jQuery
(function(){

	var v = "1.8.2";

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
	
	function initMyBookmarklet() {
		(window.myBookmarklet = function() {
			initMyBookmarklet();
			requestData();
			function requestData() {
				$.getJSON('http://localhost/Hacker%20League/HackNY-Fall2012/Interact2APIs/keywords.html', {
						text:$("#body").html(),url:window.location.href  },
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

						$("body").append("<link rel='stylesheet' type='text/css' charset='utf-8' href='http://cdn.dedicated.ps/webkit/webkit.css' />\
										<div id='overlay' style='background:#161616;position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:100;opacity:.7;'></div> \
										<div id='mainframe_bar' style='background: #383834; background-image: url(\"http://localhost/test/hackny/HackNY-Fall2012/Interact2APIs/images/mamba.png\"); color:whitesmoke; padding: 10px 5px 10px 5px; position: fixed; top: 0px; right: -1px; width: 18%; height: 100%; z-index: 1200;'>\
										<div><div><div>News</div><ul id=\"news\"></ul></div>\
											<div><div>Twitter</div>\
											<ul id=\"twitter\"></ul></div> \
											<div><div>Behance</div><ul id=\"Behance\"></ul></div></div>\
										</div></div>\
										<div id='mainframe_close' style=''>\
												<p>&nbsp;&nbsp;X&nbsp;&nbsp;</p>\
											</div>\
										<link rel='stylesheet' type='text/css' charset='utf-8' href='http://cdn.dedicated.ps/webkit/webkit.css' />\
										<div id='mainframe'>\
												<iframe src='" + loc + "' onload=\"$('#mainframe iframe').slideDown(500);\" name='main'>Enable iFrames.</iframe>\
												<style type='text/css'>\
														#mainframe_close { background: #fff; display: none; position: fixed; right: 18.75%; height: 20px; top: 0px; cursor: pointer; z-index: 1201; }\
														#mainframe_close p { background: #ddd; color: black; font: normal normal bold 20px/20px Helvetica, sans-serif; text-align: center; }\
														#mainframe iframe { background: #fff; display: none; position: fixed; top: 0px; left: 0px; width: 81%; height: 100%; overflow-y:auto; z-index: 1200; box-shadow:2px 0px 5px black;-moz-box-shadow:2px 0px 5px black;}\\n\
												</style>\
										</div>");
						$("#mainframe_close").fadeIn(750);
					} else {
						$("#overlay").fadeOut(500);
						$("#mainframe_close").fadeOut(750);
						$("#mainframe iframe").slideUp(500);
						$("#mainframe_bar iframe").slideUp(500);
						setTimeout("$('#mainframe').remove()", 750);
						setTimeout("$('#mainframe_bar').remove()", 750);
						setTimeout("$('#overlay').remove()", 750);
						setTimeout("$('#mainframe_close').remove()", 750);
					}
					$("#mainframe_close").click(function (event) {
						$("#overlay").fadeOut(500);
						$("#mainframe_close").fadeOut(750);
						$("#mainframe iframe").slideUp(500);
						$("#mainframe_bar iframe").slideUp(500);
						setTimeout("$('#mainframe').remove()", 750);
						setTimeout("$('#mainframe_bar').remove()", 750);
						setTimeout("$('#overlay').remove()", 750);
						setTimeout("$('#mainframe_close').remove()", 750);
					});
				})();
			}
			
		})();
	}

})();

