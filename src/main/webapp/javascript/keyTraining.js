$(function() {

	$(document).on('click', '.start-training', function() {
		$selectedTraining = $(this).closest('.list-group-item');
	})

	$("#confirm-training").on("click", function() {

		var trainingId = $selectedTraining.find('.start-training').attr('id');
		var characterName = $selectedTraining.find("#exampleSelect1").val();
		// console.log(trainingId);
		// console.log(characterName);
		// beginTraining(trainingId);
		var currentTrainingCost = "250";
		checkGold(currentTrainingCost);

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
					// console.log(currentTraining.id);
					// console.log(trainingId);
					var currentTrainingCost = currentTraining.trainingCost;
					console.log(currentTrainingCost);
					checkGold(currentTrainingCost);
				}

			}
		}).fail(function(response) {
		})
	}

	checkGold = function(currentTrainingCost) {
		$.ajax({
			method : "GET",
			url : "getCurrentUser"
		}).done(function(response) {
			if (response.gold < currentTrainingCost) {
				$('#goldNotificationModal').modal('show');
				$('#confirmTrainingModal').modal('hide');
			} else {
				subtractGold(response.id, response.gold, currentTrainingCost);
			}

		}).fail(function(response) {
			console.log(response);
		})
	}

	subtractGold = function(id, responseGold, currentTrainingCost) {
		var gold = responseGold - currentTrainingCost;
		$.ajax({
			method : "POST",
			url : "updateUserGold"
			data : {
				id : id,
				gold : gold
			}
		}).done(function(response) {
			window.location = "/training";

		}).fail(function(response) {
			console.log(response);
		})
	}

})