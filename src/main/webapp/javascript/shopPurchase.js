$(function() {

	// BUY BUTTON FUNCTION - GOTTA EXTRACT TEXT FROM P SOMEHOW
	$("#buy-one").on("click", function() {

		var title = $('#sea-dragon-title').text();
		var price = $('#sea-dragon-price').text();

		postPurchase(title, price);

	})

	$("#buy-two").on("click", function() {

		var title = $('#silversong-title').text();
		var price = $('#silversong-price').text();

		postPurchase(title, price);

	})

	$("#buy-three").on("click", function() {

		var title = $('#hammerholm-title').text();
		var price = $('#hammerholm-price').text();

		postPurchase(title, price);

	})

	$("#buy-four").on("click", function() {

		var title = $('#crimson-title').text();
		var price = $('#crimson-price').text();

		postPurchase(title, price);

	})

	$("#buy-five").on("click", function() {

		var title = $('#road-title').text();
		var price = $('#road-price').text();

		postPurchase(title, price);

	})

	$("#buy-six").on("click", function() {

		var title = $('#waterfall-title').text();
		var price = $('#waterfall-price').text();

		postPurchase(title, price);

	})

	$("#buy-seven").on("click", function() {

		var title = $('#ground-title').text();
		var price = $('#ground-price').text();

		postPurchase(title, price);

	})

	$("#buy-eight").on("click", function() {

		var title = $('#grove-title').text();
		var price = $('#grove-price').text();

		postPurchase(title, price);

	})

	$("#buy-nine").on("click", function() {

		var title = $('#river-title').text();
		var price = $('#river-price').text();

		postPurchase(title, price);

	})

	$("#buy-ten").on("click", function() {

		var title = $('#jungle-title').text();
		var price = $('#jungle-price').text();

		postPurchase(title, price);

	})

	$("#buy-eleven").on("click", function() {

		var title = $('#jungle-title-second').text();
		var price = $('#jungle-price-second').text();

		postPurchase(title, price);

	})

	// POST PURCHASE
	var postPurchase = function(title, price) {
		$.ajax({
			method : "POST",
			url : "createPurchase",
			data : {
				title : title,
				price : price

			}
		}).done(function(response) {

			renderPurchase(response.id, response.title, response.price);
		}).fail(function(response) {
			console.log(response);
		})
	}

	// LOAD ALL USER PURCHASES
	getUserPurchases = function() {
		$.ajax({
			method : "GET",
			url : "getMyPurchases"
		}).done(
				function(response) {
					console.log(response);
					for (var i = 0; i < response.length; i++) {
						var currentPurchase = response[i];
						renderPurchase(currentPurchase.id,
								currentPurchase.title, currentPurchase.price);
					}

				}).fail(function(response) {
			console.log(response);
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
	$("#confirm-delete").on("click", function() {

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
			$('#confirmDeleteModal').modal('hide');

		}).fail(function(response) {
			console.log(response);
		})

	}

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
						renderShopProduct(currentShopItem.id,
								currentShopItem.image, currentShopItem.title,
								currentShopItem.price);

					}

				}).fail(function(response) {
		})
	}

	// LOAD PURCHASE TEMPLATE
	var renderShopProduct = function(id, image, title, price) {

		var $template = $('#template-shop').html();
		$template = $($template);

		$template.find('.remove-item').attr('id', id);
		$template.find('.product-image').attr('src', image);
		$template.find('.product-title').text(title);
		$template.find('.product-price').text(price);

		var $commentsList = $(".shop-list");
		$commentsList.append($template);
	}

	getUserPurchases();
	getShopItems();

})