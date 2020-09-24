$(function() {

	getAllUsers = function() {
		$.ajax({
			method : "GET",
			url : "getAllUsersExceptAdmin"
		}).done(function(response) {
			sortRanking(response);

		}).fail(function(response) {
		})
	}

	getUserInfo = function(rankings) {
		$.ajax({
			method : "GET",
			url : "getCurrentUser"
		}).done(
				function(response) {
					if (!response) {
						window.location = "/";
						return;
					}
					var $ingameName = $(".user-ingame-name");
					$ingameName.text(response.ingameName);
					var $guildPoints = $(".user-guildpoints");
					$guildPoints.text(response.guildPoints);
					for (var i = 0; i < rankings.length; i++) {
						var currentUser = rankings[i];
						if (currentUser.id == response.id) {
							var currentRanking = i + 1;
							$(".user-rank").text(
									"Your current rank on the ladder is "
											+ currentRanking + " !");
							if (currentRanking == 1) {
								$("#user-badge").attr("src",
										'../../images/Rank_One.png');
							} else if (currentRanking == 2) {
								$("#user-badge").attr("src",
										'../../images/Rank_Two.png');
							} else if (currentRanking == 3) {
								$("#user-badge").attr("src",
										'../../images/Rank_Three.png');
							}
						}
					}
				});
	}

	sortRanking = function(response) {
		response.sort(function(a, b) {
			return b.guildPoints - a.guildPoints;
		});
		for (var i = 0; i < response.length; i++) {
			var currentUser = response[i];
			renderRanking(currentUser.ingameName, currentUser.guildPoints);

		}
		var rankings = response;
		getUserInfo(rankings);
	}

	var renderRanking = function(ingameName, guildPoints) {

		var $template = $('#template-ranking').html();
		$template = $($template);

		$template.find('.ingame-name').text(ingameName);
		$template.find('.guildpoints').text(guildPoints);

		var $rankingList = $('#ranking-list');
		$rankingList.append($template);
	}

	setAdminResources = function() {
		$.ajax({
			method : "POST",
			url : "setAdminResources",
		}).done(function(response) {

		});
	}

	getAllUsers();
	setAdminResources();
})