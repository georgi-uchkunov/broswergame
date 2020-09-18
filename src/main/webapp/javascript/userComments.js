$(function() {

	// LOAD ALL USER CHARACTERS
	getUserComments = function() {
		$.ajax({
			method : "GET",
			url : "getAllCommentsTwo"
		}).done(
				function(response) {
					console.log(response.content);
					for (var i = 0; i < response.content.length; i++) {
						var currentComment = response.content[i];
						renderComment(currentComment.id,
								currentComment.commenterName,
								currentComment.commenterEmail,
								currentComment.commenterComment);

					}

				}).fail(function(response) {
		})
	}

	// LOAD CHARACTER TEMPLATE
	var renderComment = function(id, commenterName, commenterEmail,
			commenterComment) {

		var $template = $('#comment-template-comment').html();
		$template = $($template);

		$template.find('.remove-comment').attr('id', id);
		$template.find('.commenter-name').text(commenterName);
		$template.find('.commenter-email').text(commenterEmail);
		$template.find('.commenter-comment').text(commenterComment);

		var $commentsList = $(".comments-list");
		$commentsList.append($template);
	}

	var loadAdminData = function() {
		$.ajax({
			method : "GET",
			url : "getCurrentUser"
		}).done(function(response) {
			if (response.email != "admin@admin.com") {
				window.location = "/";
				return;
			}
		});
	}

	$(document)
			.on(
					'click',
					'.list-group-item',
					function() {
						$selectedComment = $(this).closest(
								'.list-group-template-comment');
						$trueSelectedComment = $selectedComment.prevObject;
						var display = $trueSelectedComment.find(
								'.remove-comment').css('display');
						if (display == 'block') {
							$trueSelectedComment.find('.commenter-comment')
									.css({
										'display' : 'none',
										'opacity' : '0',
										'transition' : 'opacity 1s ease-out',
										'transition-delay' : '250ms'
									});
							$trueSelectedComment.find('.remove-comment').css({
								'display' : 'none',
								'opacity' : '0',
								'transition' : 'opacity 1s ease-out',
								'transition-delay' : '250ms'
							});
						} else {
							$trueSelectedComment.find('.commenter-comment')
									.css({
										'display' : 'block',
										'transition' : 'opacity 1s ease-out',
										'transition-delay' : '250ms'
									});
							$trueSelectedComment.find('.remove-comment').css({
								'display' : 'block',
								'transition' : 'opacity 1s ease-out',
								'transition-delay' : '250ms'
							});
							setTimeout(function() {
								$trueSelectedComment.find('.commenter-comment')
										.css({
											'opacity' : '1'
										});
							}, 110);
							setTimeout(function() {
								$trueSelectedComment.find('.remove-comment')
										.css({
											'opacity' : '1'
										});
							}, 110);
						}
					});

	// DELETE CHARACTER BUTTON
	$(document).on('click', '.remove-comment', function() {
		$selectedCharacter = $(this).closest('.list-group-item');
	})

	$('.modal.draggable>.modal-dialog').draggable({
		cursor : 'move',
		handle : '.modal-header'
	});

	$('.modal.draggable>.modal-dialog>.modal-content>.modal-header').css(
			'cursor', 'move');

	// CANCEL MODAL CONFIRMATION
	$("#confirm-delete").on(
			"click",
			function() {

				var characterId = $selectedCharacter.find('.remove-comment')
						.attr('id');
				deleteCharacterById(characterId);
			})

	// DELETE CHARACTER
	deleteCharacterById = function(id) {

		console.log(id);
		$.ajax({
			method : "POST",
			url : "deleteComment",
			data : {
				id : id
			}
		}).done(function(response) {
			$selectedCharacter.remove();
			$('#confirmDeleteModal').modal('hide');

		}).fail(function(response) {
			console.log(response);
		})

	}
	
	setAdminResources = function() {
		$.ajax({
			method : "POST",
			url : "setAdminResources",
		}).done(function(response) {

		});
	}
	
	setAdminResources();
	getUserComments();
	loadAdminData();
})