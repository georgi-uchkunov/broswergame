$(function() {

	$(document).on('click', '.start-training', function() {
		$selectedTraining = $(this).closest('.list-group-item');
	})

	$("#confirm-training").on("click", function() {

		var trainingId = $selectedTraining.find('.start-training').attr('id');
		var heroId = $("#heroIdPass").text();

		var currentTrainingCost = "250";

		checkGold(currentTrainingCost, trainingId, heroId);

	})

	beginTraining = function(trainingId) {
		$.ajax({
			method : "GET",
			url : "getAllTrainings",
		}).done(function(response) {
			console.log(response.content);
			for (var i = 0; i < response.content.length; i++) {
				var currentTraining = response.content[i];
				console.log(currentTraining);
				if (currentTraining.id = trainingId) {
					var currentTrainingCost = currentTraining.trainingCost;
					console.log(currentTrainingCost);
					checkGold(currentTrainingCost);
				}

			}
		}).fail(function(response) {
		})
	}

	$(document).on('change', '.selected-hero', function() {
		$selectedHero = $(this).closest('.form-control');
		var heroId = $selectedHero.children("option:selected").val();
		$('#heroIdPass').text(heroId);
	})

	checkGold = function(currentTrainingCost, trainingId, heroId) {
		$.ajax({
			method : "GET",
			url : "getCurrentUser"
		}).done(
				function(response) {
					if (response.gold < currentTrainingCost) {
						$('#goldNotificationModal').modal('show');
						$('#confirmTrainingModal').modal('hide');
					} else {

						var responseGold = response.gold;
						var userId = response.id;

						findSelectedHeroById(userId, responseGold,
								currentTrainingCost, trainingId, heroId);
					}

				}).fail(function(response) {
			console.log(response);
		})
	}

	subtractGold = function(userId, responseGold, currentTrainingCost,
			trainingId, heroId) {
		var gold = responseGold - currentTrainingCost;
		$.ajax({
			method : "POST",
			url : "updateUserGold",
			data : {
				id : userId,
				gold : gold
			}
		}).done(function(response) {
			// window.location = "/training";
			updateTrainingTimesChosen(trainingId, heroId);
		}).fail(function(response) {
			console.log(response);
		})
	}

	updateTrainingTimesChosen = function(trainingId, heroId) {
		$.ajax({
			method : "POST",
			url : "updateTrainingTimesChosen",
			data : {
				id : trainingId
			}
		}).done(function(response) {
			// window.location = "/training";
			$('#confirmTrainingModal').modal('hide');
			switchCharacterStatus(trainingId, heroId);
		}).fail(function(response) {
			console.log(response);
		})
	}

	switchCharacterStatus = function(trainingId, heroId) {
		$.ajax({
			method : "POST",
			url : "switchCharacterStatus",
			data : {
				id : heroId
			}
		}).done(function(response) {
			getSelectedTrainingSkill(trainingId, heroId);
		}).fail(function(response) {
			console.log(response);
		})
	}

	getSelectedTrainingSkill = function(trainingId, heroId) {
		$.ajax({
			method : "GET",
			url : "getSelectedTrainingById",
			data : {
				id : trainingId
			}
		}).done(function(response) {
			var trainingSkill = response.trainingSkill;
			console.log("nice");

		}).fail(function(response) {
			console.log(response);
		})
	}

	findSelectedHeroById = function(userId, responseGold, currentTrainingCost,
			trainingId, heroId) {
		$.ajax({
			method : "GET",
			url : "getSelectedCharacterById",
			data : {
				id : heroId
			}
		})
				.done(
						function(response) {
							console.log(response);
							var heroStatus = response.busy;
							checkSelectedHeroStatus(userId, responseGold,
									currentTrainingCost, trainingId, heroId,
									heroStatus);
							// window.location = "/training";

						}).fail(function(response) {
					console.log(response);
				})
	}

	checkSelectedHeroStatus = function(userId, responseGold,
			currentTrainingCost, trainingId, heroId, heroStatus) {
		if (heroStatus) {
			$('#confirmTrainingModal').modal('hide');
			$('#heroNotificationModal').modal('show');
		} else {
			subtractGold(userId, responseGold, currentTrainingCost, trainingId,
					heroId);
		}

	}

})