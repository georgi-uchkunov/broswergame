$(function() {

	$("#createShopItem").on("click", function() {

		var image = $("#itemImage").val();
		var title = $("#itemTitle").val();
		var price = $("#itemPrice").val();

		$.ajax({
			method : "POST",
			url : "createItem",
			data : {

				image : image,
				title : title,
				price : price
			}
		}).done(function(response) {

			window.location = "/admin_shop";
		});
	})

	// LOAD ALL SHOP ITEMS
	getShopItems = function() {
		$.ajax({
			method : "GET",
			url : "getAllShopItems"
		}).done(
				function(response) {
					console.log(response.content);
					for (var i = 0; i < response.content.length; i++) {
						var currentShopItem = response.content[i];
						renderShopItem(currentShopItem.id,
								currentShopItem.image, currentShopItem.title,
								currentShopItem.price);

					}

				}).fail(function(response) {
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

	// LOAD ITEM TEMPLATE
	var renderShopItem = function(id, image, title, price) {

		var $template = $('#shop-item-template').html();
		$template = $($template);

		$template.find('.remove-shop-item').attr('id', id);
		$template.find('.shop-item-image').attr('src', image);
		$template.find('.shop-item-title').text(title);
		$template.find('.shop-item-price').text(price);

		var $itemsList = $(".items-list");
		$itemsList.append($template);
	}

	// DELETE ITEM BUTTON
	$(document).on('click', '.remove-shop-item', function() {
		$selectedItem = $(this).closest('.list-group-shop-item');
	})

	// CANCEL MODAL CONFIRMATION
	$("#confirm-delete").on("click", function() {

		var itemId = $selectedItem.find('.remove-shop-item').attr('id');
		deleteItemById(itemId);
	})

	// DELETE ITEM
	deleteItemById = function(id) {

		console.log(id);
		$.ajax({
			method : "POST",
			url : "deleteShopItem",
			data : {
				id : id
			}
		}).done(function(response) {
			$selectedItem.remove();
			$('#confirmDeleteModal').modal('hide');

		}).fail(function(response) {
			console.log(response);
		})

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
						renderPurchase(currentPurchase.id,
								currentPurchase.title, currentPurchase.price);
						console.log(response.content);

					}

				}).fail(function(response) {
		})
	}

	// LOAD PURCHASE TEMPLATE
	var renderPurchase = function(id, title, price) {

		var $template = $('#comment-template-shop').html();
		$template = $($template);

		$template.find('.remove-item').attr('id', id);
		$template.find('.purchase-title').text(title);
		$template.find('.purchase-price').text(price);

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
			url : "cancelMyPurchase",
			data : {
				id : id
			}
		}).done(function(response) {
			$selectedPurchase.remove();
			$('#confirmDeleteModalUserChoice').modal('hide');

		}).fail(function(response) {
			console.log(response);
		})

	}

	getShopItems();
	getAllUserPurchases();
	
	loadAdminData();
})
