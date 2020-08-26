$(function() {

	getTrainings = function() {
		$.ajax({
			method : "GET",
			url : "getAllTrainings",
		}).done(
				function(response) {
					console.log(response.content);
					for (var i = 0; i < response.content.length; i++) {
						var currentTraining = response.content[i];
						renderTraining(currentTraining.id,
								currentTraining.title,
								currentTraining.trainingImage,
								currentTraining.trainingDifficulty,
								currentTraining.description,
								currentTraining.trainingTime,
								currentTraining.trainingSkill,
								currentTraining.trainingCost);

					}

				}).fail(function(response) {
		})
	}

	var renderTraining = function(id, title, trainingImage, trainingDifficulty,
			description, trainingTime, trainingSkill, trainingCost) {

		var $template = $('#template-training').html();
		$template = $($template);

		$template.find('.start-training').attr('id', id);
		$template.find('.training-title').text(title);
		$template.find('.training-image').attr('src', trainingImage);
		$template.find('.training-difficulty').text(trainingDifficulty);
		$template.find('.training-gold-cost').text(trainingCost);
		// $template.find('.training-time').text(trainingTime);
		$template.find('.training-description').text(description);
		$template.find('.training-skill').text(trainingSkill);

		if (trainingTime == 300) {
			$template.find('.training-time').text('5 min');
		}
		if (trainingTime == 900) {
			$template.find('.training-time').text('15 min');
		}
		if (trainingTime == 1800) {
			$template.find('.training-time').text('30 min');
		}
		if (trainingTime == 3600) {
			$template.find('.training-time').text('1 hour');
		}
		if (trainingTime == 5200) {
			$template.find('.training-time').text('2 hours');
		}

		var $trainingList = $('#training-list');
		$trainingList.append($template);
	}

	getUserCharactersInDropdownMenu = function() {
		$.ajax({
			method : "GET",
			url : "getMyCharacters"
		}).done(function(response) {
			console.log(response);
			var select = document.getElementById("exampleSelect1");
			for (var i = 0; i < response.length; i++) {
				var opt = response[i].name;
				var id = response[i].id;
				var el = document.createElement("option");
				el.textContent = opt;
				el.value = id;
				el.id = id;
				console.log(id);
				select.appendChild(el);
			}

		}).fail(function(response) {
			console.log(response);
		})
	}

	getTrainings();
	getUserCharactersInDropdownMenu();
})