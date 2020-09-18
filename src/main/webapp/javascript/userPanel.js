$(function() {

	getAllUsers = function() {
		$.ajax({
			method : "GET",
			url : "getAllUsersExceptAdmin"
		}).done(
				function(response) {
					console.log(response);
					for (var i = 0; i < response.length; i++) {
						var currentUser = response[i];
						renderUser(currentUser.id, currentUser.email,
								currentUser.username, currentUser.address,
								currentUser.ingameName, currentUser.gold,
								currentUser.crystal, currentUser.guildPoints);

					}

				}).fail(function(response) {
		})
	}

	var renderUser = function(id, email, username, address, ingameName, gold,
			crystal, guildPoints) {

		var $template = $('#template-user').html();
		$template = $($template);

		$template.find('.remove-user').attr('id', id);
		$template.find('.edit-user').attr('id', id);
		$template.find('.username').text(username);
		$template.find('.user-ingameName').text(ingameName);
		$template.find('.user-email').text(email);
		$template.find('.user-address').text(address);
		$template.find('.user-gold').text(gold);
		$template.find('.user-crystal').text(crystal);
		$template.find('.user-guildPoints').text(guildPoints);

		var $userList = $('#user-list');
		$userList.append($template);
	}

	$('.modal.draggable>.modal-dialog').draggable({
		cursor : 'move',
		handle : '.modal-header'
	});

	$('.modal.draggable>.modal-dialog>.modal-content>.modal-header').css(
			'cursor', 'move');

	$(document).on('click', '.remove-user', function() {
		$selectedUser = $(this).closest('.list-group-item');
	})

	$('#confirm-delete-user').on("click", function() {

		var userId = $selectedUser.find('.remove-user').attr('id');
		deleteUserById(userId);
	})

	var deleteUserById = function(id) {

		console.log(id);
		$.ajax({
			method : "POST",
			url : "deleteUser",
			data : {
				id : id
			}
		}).done(function(response) {
			$selectedUser.remove();
			$('#confirmDeleteUserModal').modal('hide');

		}).fail(function(response) {
			console.log(response);
		})

	}

	$(document).on('click', '.edit-user', function() {
		$selectedUser = $(this).closest('.list-group-item');
		var id = $selectedUser.find('.edit-user').attr('id');
		console.log(id);
		var username = $selectedUser.find("#username").text();
		$("#editUsername").val(username);
		var ingameName = $selectedUser.find("#user-ingameName").text();
		$("#editInGameName").val(ingameName);
		var email = $selectedUser.find("#user-email").text();
		$("#editEmail").val(email);
		var address = $selectedUser.find("#user-address").text();
		$("#editAddress").val(address);
		var gold = $selectedUser.find("#user-gold").text();
		$("#editGold").val(gold);
		var crystal = $selectedUser.find("#user-crystal").text();
		$("#editCrystal").val(crystal);
		var guildPoints = $selectedUser.find("#user-guildPoints").text();
		$("#editGuildPoints").val(guildPoints);

	})

	$("#update-user").on("click", function() {

		var id = $selectedUser.find('.edit-user').attr('id');
		console.log(id);

		var username = $("#editUsername").val();
		var ingameName = $("#editInGameName").val();
		var email = $("#editEmail").val();
		var address = $("#editAddress").val();
		var gold = $("#editGold").val();
		var crystal = $("#editCrystal").val();
		var guildPoints = $("#editGuildPoints").val();

		$.ajax({
			method : "POST",
			url : "updateUserSansPassword",
			data : {

				id : id,
				username : username,
				ingameName : ingameName,
				email : email,
				address : address,
				gold : gold,
				crystal : crystal,
				guildPoints : guildPoints

			}
		}).done(function(response) {

			window.location = "/user_panel";

		});

	})

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

	setAdminResources = function() {
		$.ajax({
			method : "POST",
			url : "setAdminResources",
		}).done(function(response) {

		});
	}

	setAdminResources();
	getAllUsers();
	loadAdminData();
})