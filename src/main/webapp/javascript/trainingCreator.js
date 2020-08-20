$(function() {
	
	$("#create-training").on("click", function() {

		var title = $("#title").val();
		var trainingImage = $("#trainingImage").val();
		var trainingDifficulty = $("#trainingDifficulty").val();
		var description = $("#description").val();
		var trainingTime = $("#trainingTime").val();
		var trainingSkill = $("#trainingSkill").val();
		var trainingCost = $("#trainingCost").val();

		$.ajax({
			method : "POST",
			url : "createTraining",
			data : {
				
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
	
	getTrainings = function() {
		$.ajax({
			method : "GET",
			url : "getAllTrainings",
		}).done(
				function(response) {
					console.log(response.content);
					for (var i = 0; i < response.content.length; i++) {
						var currentTraining = response.content[i];
						renderTraining(currentTraining.id, currentTraining.title, currentTraining.trainingImage, 
								currentTraining.trainingDiificulty, currentTraining.description, currentTraining.trainingTime, currentTraining.trainingSkill,
								currentTraining.trainingCost);

					}

				}).fail(function(response) {
		})
	}
	
	var renderTraining = function(id, title, trainingImage, trainingDifficulty, description, trainingTime,
			trainingSkill, trainingCost) {

		var $template = $('#template-training').html();
		$template = $($template);

		$template.find('.remove-training').attr('id', id);
		$template.find('.training-title').text(title);
		$template.find('.training-image').attr('src', trainingImage);
		$template.find('.training-difficulty').text(trainingDifficulty);
		$template.find('.training-gold-cost').text(trainingCost);
		$template.find('.training-time').text(trainingTime);
		$template.find('.training-description').text(description);
		$template.find('.training-skill').text(trainingSkill);
		

		var $trainingList = $('#training-list');
		$trainingList.append($template);
	}
	
	$(document).on('click', '.remove-training' , function() {
		$selectedTraining = $(this).closest('.list-group-item');
	})
	
	$("#confirm-delete-training").on("click", function() {

		var trainingId = $selectedTraining.find('.remove-training').attr('id');
		deleteTrainingById(trainingId);
	})
	
	deleteTrainingById = function(id) {

		console.log(id);
		$.ajax({
			method : "POST",
			url : "deleteTraining",
			data : {
				id : id
			}
		}).done(function(response) {
			$selectedTraining.remove();
			$("#confirmDeleteTrainingModal").modal('hide');

		}).fail(function(response) {
			console.log(response);
		})

	}

	
	var loadAdminData = function(){
        $.ajax({
            method: "GET",
            url: "getCurrentUser"
        })
        .done(function(response) {
           if(response.email != "admin@admin.com"){
        	   window.location = "/";
        	   return;
           }
        });
    }

	getTrainings();
	loadAdminData();
})