$(function() {

	// LOAD ALL USER CHARACTERS
	getUserCharactersInDropdownMenu = function() {
		$.ajax({
			method : "GET",
			url : "getMyCharacters"
		}).done(function(response) {
			console.log(response);
			var select = document.getElementById("exampleSelect1");
			for (var i = 0; i < response.length; i++) {
				var opt = response[i].name;
				var el = document.createElement("option");
				el.textContent = opt;
				el.value = opt;
				select.appendChild(el);
			}

		}).fail(function(response) {
			console.log(response);
		})
	}

	getUserCharactersInDropdownMenu();
})