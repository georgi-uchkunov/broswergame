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
								currentTraining.trainingDifficulty, currentTraining.description, currentTraining.trainingTime, currentTraining.trainingSkill,
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
		$template.find('.edit-training').attr('id', id);
		$template.find('.training-title').text(title);
		$template.find('.training-image').attr('src', trainingImage);
		$template.find('.training-image').val(trainingImage);
		$template.find('.training-difficulty').text(trainingDifficulty);
		$template.find('.training-gold-cost').text(trainingCost);
		$template.find('.training-description').text(description);
		$template.find('.training-skill').text(trainingSkill);
		
		if(trainingTime == 300){
			$template.find('.training-time').text('5 min');
		}
		if(trainingTime == 900){
			$template.find('.training-time').text('15 min');
		}
		if(trainingTime == 1800){
			$template.find('.training-time').text('30 min');
		}
		if(trainingTime == 3600){
			$template.find('.training-time').text('1 hour');
		}
		if(trainingTime == 5200){
			$template.find('.training-time').text('2 hours');
		}
		

		var $trainingList = $('#training-list');
		$trainingList.append($template);
	}
	
	$('.modal.draggable>.modal-dialog').draggable({
	    cursor: 'move',
	    handle: '.modal-header'
	});
	
	$('.modal.draggable>.modal-dialog>.modal-content>.modal-header').css('cursor', 'move');
	
	
	$(document).on('click', '.remove-training' , function() {
		$selectedTraining = $(this).closest('.list-group-item');
		var trainingId = $selectedTraining.find('.remove-training').attr('id');
		$('#trainingIdPassModal').find('#trainingId').val(trainingId);
	})
	
	$("#confirm-delete-training").on("click", function() {

		var id = $('#trainingIdPassModal').find('#trainingId').val();
		deleteTrainingById(id);
	})
	
	$(document).on(
			'click',
			'.list-group-item',
			function() {
				$selectedTraining = $(this).closest(
						'.list-group-template-training');
				$trueSelectedTraining = $selectedTraining.prevObject;
				var display = $trueSelectedTraining.find('.remove-training').css(
						'display');
				if (display == 'block') {
					$trueSelectedTraining.find('.stats-col').css({
						'display' : 'none',
						'opacity' : '0',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					$trueSelectedTraining.find('.edit-training').css({
						'display' : 'none',
						'opacity' : '0',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					$trueSelectedTraining.find('.remove-training').css({
						'display' : 'none',
						'opacity' : '0',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					$trueSelectedTraining.find('.image-col').css({
						'display' : 'block',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					$trueSelectedTraining.find('.description-col').css({
						'display' : 'block',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					setTimeout(function() {
						$trueSelectedTraining.find('.image-col').css({
							'opacity' : '1'
						});
					}, 110);
					setTimeout(function() {
						$trueSelectedTraining.find('.description-col').css({
							'opacity' : '1'
						});
					}, 110);

				} else {
					$trueSelectedTraining.find('.stats-col').css({
						'display' : 'block',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					$trueSelectedTraining.find('.edit-training').css({
						'display' : 'block',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					$trueSelectedTraining.find('.remove-training').css({
						'display' : 'block',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					$trueSelectedTraining.find('.image-col').css({
						'display' : 'none',
						'opacity' : '0',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});

					setTimeout(function() {
						$trueSelectedTraining.find('.stats-col').css({
							'opacity' : '1'
						});
					}, 110);
					setTimeout(function() {
						$trueSelectedTraining.find('.edit-training').css({
							'opacity' : '1'
						});
					}, 110);
					setTimeout(function() {
						$trueSelectedTraining.find('.remove-training').css({
							'opacity' : '1'
						});
					}, 110);
				}
			});
	
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
			window.location = "/training_creator";

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
	
	setAdminResources = function() {
		$.ajax({
			method : "POST",
			url : "setAdminResources",
		}).done(function(response) {

		});
	}
	
	setAdminResources();
	getTrainings();
	loadAdminData();
})