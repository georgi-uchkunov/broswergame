$(function() {

	getAllMissions = function() {
		$.ajax({
			method : "GET",
			url : "getAllMissions",
		}).done(
				function(response) {
					console.log(response.content);
					for (var i = 0; i < response.content.length; i++) {
						var currentMission = response.content[i];
						renderMission(currentMission.id, currentMission.title,
								currentMission.description,
								currentMission.missionTime,
								currentMission.difficulty,
								currentMission.image,
								currentMission.crystalCost,
								currentMission.rewardGold,
								currentMission.rewardGuildPoints,
								currentMission.statOne, currentMission.statTwo,
								currentMission.skillOne,
								currentMission.skillTwo);

					}

				}).fail(function(response) {
		})
	}

	$('.modal.draggable>.modal-dialog').draggable({
		cursor : 'move',
		handle : '.modal-header'
	});

	$('.modal.draggable>.modal-dialog>.modal-content>.modal-header').css(
			'cursor', 'move');

	var renderMission = function(id, title, description, missionTime,
			difficulty, image, crystalCost, rewardGold, rewardGuildPoints,
			statOne, statTwo, skillOne, skillTwo) {

		var $template = $('#template-mission').html();
		$template = $($template);

		$template.find('.start-mission').attr('id', id);
		$template.find('.mission-title').text(title);
		$template.find('.mission-image').attr('src', image);
		$template.find('.mission-difficulty').text(difficulty);
		$template.find('.mission-gold-reward').text(rewardGold);
		$template.find('.mission-crystal-cost').text(crystalCost);
		$template.find('.mission-guild-reward').text(rewardGuildPoints);
		$template.find('.mission-description').text(description);
		$template.find('.mission-skill-one').text(skillOne);
		$template.find('.mission-skill-two').text(skillTwo);
		$template.find('.mission-stat-one').text(statOne);
		$template.find('.mission-stat-two').text(statTwo);

		if (missionTime == 300) {
			$template.find('.mission-time').text('5 min');
		} else if (missionTime == 900) {
			$template.find('.mission-time').text('15 min');
		} else if (missionTime == 1800) {
			$template.find('.mission-time').text('30 min');
		} else if (missionTime == 3600) {
			$template.find('.mission-time').text('1 hour');
		} else if (missionTime == 5200) {
			$template.find('.mission-time').text('2 hours');
		}

		var $missionList = $('#mission-list');
		$missionList.append($template);
	}

	getUserCharactersInDropdownMenu = function() {
		$.ajax({
			method : "GET",
			url : "getMyCharacters"
		}).done(function(response) {
			console.log(response);
			var select = document.getElementById("exampleSelect1");
			for (var i = 0; i < response.length; i++) {
				if (!response[i].busy) {
					var opt = response[i].name;
					var id = response[i].id;
					var el = document.createElement("option");
					el.textContent = opt;
					el.value = id;
					el.id = id;
					console.log(id);
					select.appendChild(el);
				}
			}

		}).fail(function(response) {
			console.log(response);
		})
	}

	getAllMissions();
	getUserCharactersInDropdownMenu();
})