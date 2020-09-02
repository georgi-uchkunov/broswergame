$(function() {

	$(document).on('click', '.start-mission', function() {
		$selectedMission = $(this).closest('.list-group-item');
	})

	$("#confirm-mission").on("click", function() {

		var missionId = $selectedMission.find('.start-mission').attr('id');
		var heroId = $("#heroIdPass").text();
		console.log('hello');
		getSelectedMissionCost(missionId, heroId);

	})

	$(document).on('change', '.selected-hero', function() {
		$selectedHero = $(this).closest('.form-control');
		var heroId = $selectedHero.children("option:selected").val();
		$('#heroIdPass').text(heroId);
	})

	getSelectedMissionCost = function(missionId, heroId) {
		$.ajax({
			method : "GET",
			url : "getSelectedMissionById",
			data : {
				id : missionId
			}
		}).done(function(response) {
			var missionCost = response.crystalCost;
			checkCrystal(missionId, heroId, missionCost);

		}).fail(function(response) {
			console.log(response);
		})
	}

	checkCrystal = function(missionId, heroId, missionCost) {
		$.ajax({
			method : "GET",
			url : "getCurrentUser"
		}).done(
				function(response) {
					if (response.crystal < missionCost) {
						$('#crystalNotificationModal').modal('show');
						$('#confirmTrainingModal').modal('hide');
					} else {

						var responseCrystal = response.crystal;
						var userId = response.id;

						findSelectedHeroById(userId, missionId, heroId,
								responseCrystal, missionCost);
					}

				}).fail(function(response) {
			console.log(response);
		})
	}

	findSelectedHeroById = function(userId, missionId, heroId, responseCrystal,
			missionCost) {
		$.ajax({
			method : "GET",
			url : "getSelectedCharacterById",
			data : {
				id : heroId
			}
		}).done(
				function(response) {
					var heroStatus = response.busy;
					checkSelectedHeroStatus(userId, missionId, heroId,
							responseCrystal, missionCost, heroStatus);

				}).fail(function(response) {
			console.log(response);
		})
	}

	checkSelectedHeroStatus = function(userId, missionId, heroId,
			responseCrystal, missionCost, heroStatus) {
		if (heroStatus) {
			$('#confirmTrainingModal').modal('hide');
			$('#heroNotificationModal').modal('show');
		} else {
			subtractCrystal(userId, missionId, heroId, responseCrystal,
					missionCost);
		}

	}

	subtractCrystal = function(userId, missionId, heroId, responseCrystal,
			missionCost) {
		$.ajax({
			method : "POST",
			url : "updateUserCrystal",
			data : {
				id : userId,
				missionCost : missionCost
			}
		}).done(function(response) {
			updateMissionTimesChosen(userId, heroId, missionId);
		}).fail(function(response) {
			console.log(response);
		})
	}

	updateMissionTimesChosen = function(userId, heroId, missionId) {
		$.ajax({
			method : "POST",
			url : "updateMissionTimesChosen",
			data : {

				id : missionId
			}
		}).done(function(response) {
			$('#confirmMissionModal').modal('hide');
			switchCharacterStatus(userId, heroId, missionId);
		}).fail(function(response) {
			console.log(response);
		})
	}

	switchCharacterStatus = function(userId, heroId, missionId) {
		$.ajax({
			method : "POST",
			url : "switchCharacterStatus",
			data : {
				id : heroId
			}
		}).done(function(response) {
			getSelectedMissionSkillsAndStats(userId, heroId, missionId);
		}).fail(function(response) {
			console.log(response);
		})
	}

	getSelectedMissionSkillsAndStats = function(userId, heroId, missionId) {
		$.ajax({
			method : "GET",
			url : "getSelectedMissionById",
			data : {
				id : missionId
			}
		}).done(
				function(response) {
					var skillOne = response.skillOne;
					var skillTwo = response.skillTwo;
					var statOne = response.statOne;
					var statTwo = response.statTwo;
					var difficulty = response.difficulty;
					var missionTime = response.missionTime;
					var rewardGold = response.rewardGold;
					var rewardGuildPoints = response.rewardGuildPoints;
					performMission(userId, heroId, skillOne, skillTwo, statOne,
							statTwo, difficulty, missionTime, rewardGold,
							rewardGuildPoints);

				}).fail(function(response) {
			console.log(response);
		})
	}

	performMission = function(userId, heroId, skillOne, skillTwo, statOne,
			statTwo, difficulty, missionTime, rewardGold, rewardGuildPoints) {
		$.ajax({
			method : "GET",
			url : "performMission",
			data : {

				id : heroId,
				userId : userId,
				skillOne : skillOne,
				skillTwo : skillTwo,
				statOne : statOne,
				statTwo : statTwo,
				difficulty : difficulty,
				missionTime : missionTime,
				rewardGold : rewardGold,
				rewardGuildPoints : rewardGuildPoints

			}
		}).done(function(response) {

		}).fail(function(response) {
			console.log(response);
		})

	}

})