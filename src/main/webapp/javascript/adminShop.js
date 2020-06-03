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
	// LOAD ALL USER CHARACTERS
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

	// LOAD item TEMPLATE
	var renderShopItem = function(id, image, title, price) {

		var $template = $('#shop-item-template').html();
		$template = $($template);

		$template.find('.remove-comment').attr('id', id);
		$template.find('.shop-item-image').val(image);
		$template.find('.shop-item-title').text(title);
		$template.find('.shop-item-price').text(price);

		var $itemsList = $(".items-list");
		$itemsList.append($template);
	}

	// DELETE item BUTTON
	$(document).on('click', '.remove-shop-item', function() {
		$selectedItem = $(this).closest('.list-group-shop-item');
	})

	// CANCEL MODAL CONFIRMATION
	$("#confirm-delete").on(
			"click",
			function() {

				var itemId = $selectedItem.find('.remove-shop-item')
						.attr('id');
				deleteItemById(itemId);
			})

	// DELETE CHARACTER
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

	getShopItems();
})
