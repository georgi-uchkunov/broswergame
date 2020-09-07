$(function() {

	$(document).on(
			'click',
			'.edit-training',
			function() {
				$selectedTraining = $(this).closest('.list-group-item');
				var trainingId = $selectedTraining.find('.edit-training').attr('id');
				$('#trainingIdPassModal').find('#trainingId').val(trainingId);
				var id = $('#trainingIdPassModal').find('#trainingId').val();
				console.log(id);
				var title = $selectedTraining.find('#training-title').text();
				$("#editTitle").val(title);
				var trainingImage = $selectedTraining.find('#img-training')
						.val();
				$("#editTrainingImage").val(trainingImage);
				var trainingDifficulty = $selectedTraining.find(
						'#training-difficulty').text();
				$("#editTrainingDifficulty").val(trainingDifficulty);
				var description = $selectedTraining.find(
						'#training-description').text();
				$("#editDescription").val(description);
				var trainingTime = $selectedTraining.find('#training-time')
						.text();
				if (trainingTime == "5 min") {
					$("#editTrainingTime").val("300");
				}
				if (trainingTime == "10 min") {
					$("#editTrainingTime").val("600");
				}
				if (trainingTime == "15 min") {
					$("#editTrainingTime").val("900");
				}
				if (trainingTime == "30 min") {
					$("#editTrainingTime").val("1800");
				}
				if (trainingTime == "1 hour") {
					$("#editTrainingTime").val("3600");
				}
				if (trainingTime == "2 hours") {
					$("#editTrainingTime").val("5200");
				}

				var trainingSkill = $selectedTraining.find('#training-skill')
						.text();
				$("#editTrainingSkill").val(trainingSkill);
				var trainingCost = $selectedTraining
						.find('#training-gold-cost').text();
				$("#editTrainingCost").val(trainingCost);

			})

	$("#update-training").on("click", function() {

		var id = $('#trainingIdPassModal').find('#trainingId').val();
		console.log(id);

		var title = $("#editTitle").val();
		console.log(title);
		var trainingImage = $("#editTrainingImage").val();
		console.log(trainingImage);
		var trainingDifficulty = $("#editTrainingDifficulty").val();
		console.log(trainingDifficulty);
		var description = $("#editDescription").val();
		console.log(description);
		var trainingTime = $("#editTrainingTime").val();
		console.log(trainingTime);
		var trainingSkill = $("#editTrainingSkill").val();
		console.log(trainingSkill);
		var trainingCost = $("#editTrainingCost").val();
		console.log(trainingCost);

		$.ajax({
			method : "POST",
			url : "updateTrainingSansTimesChosen",
			data : {

				id : id,
				title : title,
				trainingImage : trainingImage,
				trainingDifficulty : trainingDifficulty,
				description : description,
				trainingTime : trainingTime,
				trainingSkill : trainingSkill,
				trainingCost : trainingCost

			}
		}).done(function(response) {

			window.location = "/training_creator";
		});

	})

})