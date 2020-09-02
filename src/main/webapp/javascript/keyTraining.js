$(function() {

	$(document).on('click', '.start-training', function() {
		$selectedTraining = $(this).closest('.list-group-item');
	})

	$("#confirm-training").on("click", function() {

		var trainingId = $selectedTraining.find('.start-training').attr('id');
		var heroId = $("#heroIdPass").text();

		getSelectedTrainingCost(trainingId, heroId);

	})

	$(document).on('change', '.selected-hero', function() {
		$selectedHero = $(this).closest('.form-control');
		var heroId = $selectedHero.children("option:selected").val();
		$('#heroIdPass').text(heroId);
	})

	checkGold = function(trainingCost, trainingId, heroId) {
		$.ajax({
			method : "GET",
			url : "getCurrentUser"
		}).done(
				function(response) {
					if (response.gold < trainingCost) {
						$('#goldNotificationModal').modal('show');
						$('#confirmTrainingModal').modal('hide');
					} else {

						var responseGold = response.gold;
						var userId = response.id;

						findSelectedHeroById(userId, responseGold,
								trainingCost, trainingId, heroId);
					}

				}).fail(function(response) {
			console.log(response);
		})
	}

	subtractGold = function(userId, responseGold, trainingCost, trainingId,
			heroId) {
		$.ajax({
			method : "POST",
			url : "updateUserGold",
			data : {
				id : userId,
				trainingCost : trainingCost
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
		}).done(
				function(response) {
					var trainingSkill = response.trainingSkill;
					var trainingDifficulty = response.trainingDifficulty;
					var trainingTime = response.trainingTime;
					performTraining(trainingId, heroId, trainingSkill,
							trainingDifficulty, trainingTime);
					/*
					 * updateHeroSkill(trainingId, heroId, trainingSkill,
					 * trainingDifficulty);
					 */

				}).fail(function(response) {
			console.log(response);
		})
	}

	getSelectedTrainingCost = function(trainingId, heroId) {
		$.ajax({
			method : "GET",
			url : "getSelectedTrainingById",
			data : {
				id : trainingId
			}
		}).done(function(response) {
			var trainingCost = response.trainingCost;
			console.log(trainingCost);
			checkGold(trainingCost, trainingId, heroId);

		}).fail(function(response) {
			console.log(response);
		})
	}

	updateHeroSkill = function(trainingId, heroId, trainingSkill,
			trainingDifficulty) {

		switch (trainingSkill) {
		case 'swordfighting':
			updateSwordfighting(heroId, trainingDifficulty, trainingSkill);
			break;
		case 'acrobatics':
			updateAcrobatics(heroId, trainingDifficulty, trainingSkill);
			break;
		case 'defense':
			updateDefense(heroId, trainingDifficulty, trainingSkill);
			break;
		case 'investigation':
			updateInvestigation(heroId, trainingDifficulty, trainingSkill);
			break;
		case 'spellcasting':
			updateSpellcasting(heroId, trainingDifficulty, trainingSkill);
			break;
		case 'gambit':
			updateGambit(heroId, trainingDifficulty, trainingSkill);
			break;
		}
	}

	updateSwordfighting = function(heroId, trainingDifficulty, trainingSkill) {
		$.ajax({
			method : "POST",
			url : "updateSwordfighting",
			data : {
				id : heroId,
				trainingDifficulty : trainingDifficulty
			}
		}).done(function(response) {
			console.log(response);
			var heroName = response.name;
			trainingFinalize(heroName, trainingDifficulty, trainingSkill);
			// window.location = "/training";

		}).fail(function(response) {
			console.log(response);
		})
	}

	updateAcrobatics = function(heroId, trainingDifficulty, trainingSkill) {
		$.ajax({
			method : "POST",
			url : "updateAcrobatics",
			data : {
				id : heroId,
				trainingDifficulty : trainingDifficulty
			}
		}).done(function(response) {
			console.log(response);
			var heroName = response.name;
			trainingFinalize(heroName, trainingDifficulty, trainingSkill);
			// window.location = "/training";

		}).fail(function(response) {
			console.log(response);
		})
	}

	updateDefense = function(heroId, trainingDifficulty, trainingSkill) {
		$.ajax({
			method : "POST",
			url : "updateDefense",
			data : {
				id : heroId,
				trainingDifficulty : trainingDifficulty
			}
		}).done(function(response) {
			console.log(response);
			var heroName = response.name;
			trainingFinalize(heroName, trainingDifficulty, trainingSkill);
			// window.location = "/training";

		}).fail(function(response) {
			console.log(response);
		})
	}

	updateInvestigation = function(heroId, trainingDifficulty, trainingSkill) {
		$.ajax({
			method : "POST",
			url : "updateInvestigation",
			data : {
				id : heroId,
				trainingDifficulty : trainingDifficulty
			}
		}).done(function(response) {
			console.log(response);
			var heroName = response.name;
			trainingFinalize(heroName, trainingDifficulty, trainingSkill);
			// window.location = "/training";

		}).fail(function(response) {
			console.log(response);
		})
	}

	updateSpellcasting = function(heroId, trainingDifficulty, trainingSkill) {
		$.ajax({
			method : "POST",
			url : "updateSpellcasting",
			data : {
				id : heroId,
				trainingDifficulty : trainingDifficulty
			}
		}).done(function(response) {
			console.log(response);
			var heroName = response.name;
			trainingFinalize(heroName, trainingDifficulty, trainingSkill);
			// window.location = "/training";

		}).fail(function(response) {
			console.log(response);
		})
	}

	updateGambit = function(heroId, trainingDifficulty, trainingSkill) {
		$.ajax({
			method : "POST",
			url : "updateGambit",
			data : {
				id : heroId,
				trainingDifficulty : trainingDifficulty
			}
		}).done(function(response) {
			console.log(response);
			var heroName = response.name;
			trainingFinalize(heroName, trainingDifficulty, trainingSkill);
			// window.location = "/training";

		}).fail(function(response) {
			console.log(response);
		})
	}

	trainingFinalize = function(heroName, trainingDifficulty, trainingSkill) {
		$("#finishedTrainingModal").modal('show');
		if (trainingDifficulty == "Easy") {
			$("#finish-message").text(
					"Congratulations! " + heroName
							+ " has successfully finished their "
							+ trainingSkill + " training. " + heroName
							+ "'s skill has increased slightly!");
		} else if (trainingDifficulty == "Medium") {
			$("#finish-message").text(
					"Congratulations! " + heroName
							+ " has successfully finished their "
							+ trainingSkill + " training. " + heroName
							+ "'s skill has increased quite a lot!");
		} else if (trainingDifficulty == "Hard") {
			$("#finish-message").text(
					"Congratulations! " + heroName
							+ " has successfully finished their "
							+ trainingSkill + " training. " + heroName
							+ "'s skill has increased substantially!");
		}

	}

	performTraining = function(trainingId, heroId, trainingSkill,
			trainingDifficulty, trainingTime) {
		startTime = new Date();
		$.ajax({
			method : "GET",
			url : "performTraining",
			data : {
				trainingTime : trainingTime,
				id : heroId,
				trainingSkill : trainingSkill,
				trainingDifficulty : trainingDifficulty
			}
		}).done(function(response) {
			finishTime = new Date();
			console.log(startTime);
			console.log(finishTime);
			/*
			 * updateHeroSkill(trainingId, heroId, trainingSkill,
			 * trainingDifficulty)
			 */

		}).fail(function(response) {
			console.log(response);
		})

	}

	findSelectedHeroById = function(userId, responseGold, trainingCost,
			trainingId, heroId) {
		$.ajax({
			method : "GET",
			url : "getSelectedCharacterById",
			data : {
				id : heroId
			}
		}).done(
				function(response) {
					var heroStatus = response.busy;
					checkSelectedHeroStatus(userId, responseGold, trainingCost,
							trainingId, heroId, heroStatus);
					// window.location = "/training";

				}).fail(function(response) {
			console.log(response);
		})
	}

	checkSelectedHeroStatus = function(userId, responseGold, trainingCost,
			trainingId, heroId, heroStatus) {
		if (heroStatus) {
			$('#confirmTrainingModal').modal('hide');
			$('#heroNotificationModal').modal('show');
		} else {
			subtractGold(userId, responseGold, trainingCost, trainingId, heroId);
		}

	}

})