$(function() {
	
	$(document).on('click', '.start-training' , function() {
		$selectedTraining = $(this).closest('.list-group-item');
	})
	
	$("#confirm-training").on("click", function() {

		var trainingId = $selectedTraining.find('.start-training').attr('id');
		var characterName = $selectedTraining.find("#exampleSelect1").val();
		console.log(trainingId);
		console.log(characterName);
	})
	
})