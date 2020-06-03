$(function() {

	// LOAD ALL USER CHARACTERS
	getAdminNews = function() {
		$.ajax({
			method : "GET",
			url : "getAllNews"
		}).done(
				function(response) {
					console.log(response.content);
					for (var i = 0; i < response.content.length; i++) {
						var currentNews = response.content[i];
						renderNews(currentNews.id,
								currentNews.newsTitle,
								currentNews.newsImage,
								currentNews.newsText);
						
					}

				}).fail(function(response) {
		})
	}

	// LOAD CHARACTER TEMPLATE
	var renderNews = function(id, newsTitle, newsImage,
			newsText) {

		var $template = $('#comment-template-news').html();
		$template = $($template);

		$template.find('.newsTitle').text(newsTitle);
		$template.find('.newsImage').text(newsImage);
		$template.find('.newsText').text(newsText);

		var $commentsList = $(".comments-list");
		$commentsList.append($template);
	}
	
	$("#submitNews").on("click", function() {

		var title = $("#newsTitle").val();
		var image = $("#newsImage").val();
		var text = $("#newsText").val();

		$.ajax({
			method : "POST",
			url : "postNews",
			data : {
				
				newsTitle : title,
				newsImage : image,
				newsText : text
			}
		}).done(function(response) {
			
			window.location = "/admin_portal";
		});
	})

	

	getAdminNews();
})