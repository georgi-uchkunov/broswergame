$(function() {

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

	// LOAD ALL USER CHARACTERS
	getAllUserPurchases = function() {
		$.ajax({
			method : "GET",
			url : "getAllUserPurchases"
		}).done(
				function(response) {
					console.log(response.content);
					for (var i = 0; i < response.content.length; i++) {
						var currentPurchase = response.content[i];
						getPurchaseOwner(currentPurchase.id,
								currentPurchase.title, currentPurchase.price);
						// renderPurchase(currentPurchase.id,
						// currentPurchase.title, currentPurchase.price);
						console.log(response.content);

					}

				}).fail(function(response) {
		})
	}

	// LOAD PURCHASE TEMPLATE
	var renderPurchase = function(id, title, price, owner) {

		var $template = $('#comment-template-shop').html();
		$template = $($template);

		$template.find('.remove-item').attr('id', id);
		$template.find('.purchase-title').text(title);
		$template.find('.purchase-price').text(price);
		$template.find('.purchase-owner').text(owner);

		var $commentsList = $(".comments-list");
		$commentsList.append($template);
	}

	// CANCEL PURCHASE BUTTON
	$(document).on('click', '.remove-item', function() {
		$selectedPurchase = $(this).closest('.list-group-item');
	})

	// CANCEL MODAL CONFIRMATION
	$("#confirm-delete-order").on("click", function() {

		var purchaseId = $selectedPurchase.find('.remove-item').attr('id');
		cancelPurchaseById(purchaseId);
	})

	// CANCEL ORDER
	cancelPurchaseById = function(id) {
		$.ajax({
			method : "POST",
			url : "deleteUserPurchase",
			data : {
				id : id
			}
		}).done(function(response) {
			$selectedPurchase.remove();
			$('#confirmDeleteModalUserChoice').modal('hide');
			$('#delete-reason').val('');

		}).fail(function(response) {
			console.log(response);
		})

	}

	$(document).on('click', '.edit-shop-item', function() {
		$selectedShopItem = $(this).closest('.list-group-shop-item');
		var id = $selectedShopItem.find('.edit-shop-item').attr('id');
		console.log(id);

		var shopitemImage = $selectedShopItem.find('#shop-item-image').val();
		$("#itemImageEdit").val(shopitemImage);
		var shopitemTitle = $selectedShopItem.find('.shop-item-title').text();
		$("#itemTitleEdit").val(shopitemTitle);
		var shopitemPrice = $selectedShopItem.find('.shop-item-price').text();
		$("#itemPriceEdit").val(shopitemPrice);

	})

	$("#confirm-update-item").on("click", function() {

		var id = $selectedShopItem.find('.edit-shop-item').attr('id');

		var title = $("#itemTitleEdit").val();
		var price = $("#itemPriceEdit").val();
		var image = $("#itemImageEdit").val();

		$.ajax({
			method : "POST",
			url : "updateShopItem",
			data : {

				id : id,
				title : title,
				price : price,
				image : image,

			}
		}).done(function(response) {

			window.location = "/admin_shop";
		});

	})

	getPurchaseOwner = function(id, title, price) {
		$.ajax({
			method : "GET",
			url : "getPurchaseOwner",
			data : {
				id : id
			}
		}).done(function(response) {
			var owner = response;
			renderPurchase(id, title, price, owner);
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
	getAllUserPurchases();
	loadAdminData();
})