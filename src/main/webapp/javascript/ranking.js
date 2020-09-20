$(function() {
	
	getAllUsers = function() {
		$.ajax({
			method : "GET",
			url : "getAllUsersExceptAdmin"
		}).done(
				function(response) {
					console.log(response);
					sortRanking(response);

				}).fail(function(response) {
		})
	}
	
	sortRanking = function(response){
		response.sort(function(a,b){
			return b.guildPoints - a.guildPoints;
		});
		for (var i = 0; i < response.length; i++) {
			var currentUser = response[i];
			renderRanking(currentUser.ingameName, currentUser.guildPoints);

		}
		console.log(response);
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