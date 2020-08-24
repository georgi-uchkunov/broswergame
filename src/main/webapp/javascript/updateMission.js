$(function() {

	$(document)
			.on(
					'click',
					'.edit-mission',
					function() {
						$selectedMission = $(this).closest('.list-group-item');
						var id = $selectedMission.find('.edit-mission').attr(
								'id');
						console.log(id);
						var title = $selectedMission.find('#mission-title')
								.text();
						$("#editTitle").val(title);
						var missionImage = $selectedMission
								.find('#img-mission').val();
						$("#editImage").val(missionImage);
						var missionDifficulty = $selectedMission.find(
								"#mission-difficulty").text();
						$("#editDifficulty").val(missionDifficulty);
						var description = $selectedMission.find(
								'#mission-description').text();
						$("#editDescription").val(description);
						var missionTime = $selectedMission
								.find('#mission-time').text();
						if (missionTime == "5 min") {
							$("#editMissionTime").val("300");
						}
						if (missionTime == "10 min") {
							$("#editMissionTime").val("600");
						}
						if (missionTime == "15 min") {
							$("#editMissionTime").val("900");
						}
						if (missionTime == "30 min") {
							$("#editMissionTime").val("1800");
						}
						if (missionTime == "1 hour") {
							$("#editMissionTime").val("3600");
						}
						if (missionTime == "2 hours") {
							$("#editMissionTime").val("5200");
						}

						var missionSkillOne = $selectedMission.find(
								'#mission-skill-one').text();
						$("#editSkillOne").val(missionSkillOne);
						var missionSkillTwo = $selectedMission.find(
								'#mission-skill-two').text();
						$("#editSkillTwo").val(missionSkillTwo);
						var missionStatOne = $selectedMission.find(
								'#mission-stat-one').text();
						$("#editStatOne").val(missionStatOne);
						var missionStatTwo = $selectedMission.find(
								'#mission-stat-two').text();
						$("#editStatTwo").val(missionStatTwo);
						var missionCrystalCost = $selectedMission.find(
								'#mission-crystal-cost').text();
						$("#editCrystalCost").val(missionCrystalCost);
						var missionGoldReward = $selectedMission.find(
								'#mission-gold-reward').text();
						$("#editRewardGold").val(missionGoldReward);
						var missionGuildReward = $selectedMission.find(
								'#mission-guild-points-reward').text();
						$("#editRewardGuildPoints").val(missionGuildReward);

					})

	$("#update-mission").on("click", function() {

		var id = $selectedMission.find('.edit-mission').attr('id');

		var title = $("#editTitle").val();
		var image = $("#editImage").val();
		var difficulty = $("#editDifficulty").val();
		var description = $("#editDescription").val();
		var missionTime = parseInt($("#editMissionTime").val());
		var skillOne = $("#editSkillOne").val();
		var skillTwo = $("#editSkillTwo").val();
		var statOne = $("#editStatOne").val();
		var statTwo = $("#editStatTwo").val();
		var crystalCost = parseInt($("#editCrystalCost").val());
		console.log(crystalCost);
		var rewardGold = parseInt($("#editRewardGold").val());
		var rewardGuildPoints = parseInt($("#editRewardGuildPoints").val());

		$.ajax({
			method : "POST",
			url : "updateMission",
			data : {

				id : id,
				title : title,
				image : image,
				difficulty : difficulty,
				description : description,
				missionTime : missionTime,
				skillOne : skillOne,
				skillTwo : skillTwo,
				statOne : statOne,
				statTwo : statTwo,
				crystalCost : crystalCost,
				rewardGold : rewardGold,
				rewardGuildPoints : rewardGuildPoints
			}
		}).done(function(response) {

			window.location="/mission_creator";
		});

	})

})