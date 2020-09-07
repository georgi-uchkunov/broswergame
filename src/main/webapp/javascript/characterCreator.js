$(function() {

	// CREATE CAHARACTER
	$("#create").on("click", function() {
		getHeroNumbers();
	})

	getHeroNumbers = function() {
		$.ajax({
			method : "GET",
			url : "getHeroNumbers"
		}).done(function(response) {
			console.log(response);
			if (response.includes("reached")) {
				$('.response-text').text(response);
				$('#heroLimitExceededModal').modal('show');
			} else if (response.includes("spend")) {
				$('.response-text').text(response);
				$('#spendCrystalsForHeroModal').modal('show');
			} else if (response.includes("with")) {
				$('.response-text').text(response);
				$('#approveHeroModal').modal('show');
			}
		}).fail(function(response) {
			console.log(response);
		})
	}

	$("#spend-crystals").on('click', function() {
		spendCrystalsOnNewHero();
		$('#spendCrystalsForHeroModal').modal('hide');

	})

	spendCrystalsOnNewHero = function() {
		$.ajax({
			method : "POST",
			url : "spendCrystalsOnNewHero"
		}).done(function(response) {
			if (response.includes("recruit")) {
				getNewCharacterInfo();
			} else {
				$("#notEnoughCrystalsModal").modal('show');
			}
		}).fail(function(response) {
			console.log(response);
		})
	}

	$("#approve-hero").on('click', function() {
		getNewCharacterInfo();
		$("#approveHeroModal").modal('hide');
	})

	$('.modal.draggable>.modal-dialog').draggable({
		cursor : 'move',
		handle : '.modal-header'
	});

	$('.modal.draggable>.modal-dialog>.modal-content>.modal-header').css(
			'cursor', 'move');

	getNewCharacterInfo = function() {
		var name = $('#character-name').val();
		var race = $('#select-race').val();
		var characterClass = $('#select-class').val();
		var level = "1";
		var strength = $('#select-str').val();
		var agility = $('#select-agi').val();
		var fortitude = $('#select-for').val();
		var intelligence = $('#select-int').val();
		var magic = $('#select-mag').val();
		var luck = $('#select-lck').val();

		postCharacter(name, race, characterClass, level, strength, agility,
				fortitude, intelligence, magic, luck);
	}

	// POST CHARACTER
	var postCharacter = function(name, race, characterClass, level, strength,
			agility, fortitude, intelligence, magic, luck) {
		$.ajax({
			method : "POST",
			url : "/createCharacter",
			data : {
				name : name,
				race : race,
				characterClass : characterClass,
				level : level,
				strength : strength,
				agility : agility,
				fortitude : fortitude,
				intelligence : intelligence,
				magic : magic,
				luck : luck
			}
		}).done(
				function(response) {
					renderCharacter(response.id, response.name, response.race,
							response.characterClass, response.busy,
							response.level, response.strength,
							response.agility, response.fortitude,
							response.intelligence, response.magic,
							response.luck, response.swordfighting,
							response.acrobatics, response.defense,
							response.investigation, response.spellcasting,
							response.gambit);
				}).fail(function(response) {
			console.log(response);
		})
	}

	// LOAD ALL USER CHARACTERS
	getUserCharacters = function() {
		$.ajax({
			method : "GET",
			url : "getMyCharacters"
		}).done(
				function(response) {
					console.log(response);
					for (var i = 0; i < response.length; i++) {
						var currentCharacter = response[i];
						renderCharacter(currentCharacter.id,
								currentCharacter.name, currentCharacter.race,
								currentCharacter.characterClass,
								currentCharacter.busy, currentCharacter.level,
								currentCharacter.strength,
								currentCharacter.agility,
								currentCharacter.fortitude,
								currentCharacter.intelligence,
								currentCharacter.magic, currentCharacter.luck,
								currentCharacter.swordfighting,
								currentCharacter.acrobatics,
								currentCharacter.defense,
								currentCharacter.investigation,
								currentCharacter.spellcasting,
								currentCharacter.gambit);
					}

				}).fail(function(response) {
			console.log(response);
		})
	}

	// LOAD CHARACTER TEMPLATE
	var renderCharacter = function(id, name, race, characterClass, busy, level,
			strength, agility, fortitude, intelligence, magic, luck,
			swordfighting, acrobatics, defense, investigation, spellcasting,
			gambit) {

		console.log(id, name, race, characterClass, level, strength, agility,
				fortitude, intelligence, magic, luck, swordfighting,
				acrobatics, defense, defense, spellcasting, gambit);

		var $template = $('#comment-template-character').html();
		$template = $($template);

		$template.find('.remove-character').attr('id', id);
		$template.find('.name').text(name);
		$template.find('.race').text(race);
		$template.find('.characterClass').text(characterClass);
		$template.find('.level').text(level);
		$template.find('.strength').text(strength);
		$template.find('.agility').text(agility);
		$template.find('.fortitude').text(fortitude);
		$template.find('.intelligence').text(intelligence);
		$template.find('.magic').text(magic);
		$template.find('.luck').text(luck);
		$template.find('.swordfighting').text(swordfighting);
		$template.find('.acrobatics').text(acrobatics);
		$template.find('.defense').text(defense);
		$template.find('.investigation').text(investigation);
		$template.find('.spellcasting').text(spellcasting);
		$template.find('.gambit').text(gambit);

		if (busy) {
			$template.find('.status-message').text(
					'Having an adventure! Be back in a while.');
			$template.find('.progress-bar')[0].classList.add("bg-danger");
			$template.find('.progress-bar')[0].classList.remove("bg-success");
		}

		$template.find('.img-template-race').attr('title', race);
		$template.find('.img-template-class').attr('title', characterClass);

		if (race == "Human") {
			$template.find('.img-template-race').attr('src',
					'../../images/human_icon.png');
		}
		if (race == "Elf") {
			$template.find('.img-template-race').attr('src',
					'../../images/elf_logo.png');
		}
		if (race == "Dwarf") {
			$template.find('.img-template-race').attr('src',
					'../../images/dwarf_logo.png');
		}
		if (race == "Orc") {
			$template.find('.img-template-race').attr('src',
					'../../images/orc_logo.png');
		}
		if (characterClass == "Thief") {
			$template.find('.img-template-class').attr('src',
					'../../images/thief_logo.png');
		}
		if (characterClass == "Mage") {
			$template.find('.img-template-class').attr('src',
					'../../images/mage_logo.png');
		}
		if (characterClass == "Tank") {
			$template.find('.img-template-class').attr('src',
					'../../images/tank_logo.png');
		}
		if (characterClass == "Fighter") {
			$template.find('.img-template-class').attr('src',
					'../../images/fighter_logo.png');
		}
		if (characterClass == "Healer") {
			$template.find('.img-template-class').attr('src',
					'../../images/healer_logo.png');
		}

		var $commentsList = $(".comments-list");
		$commentsList.append($template);
	}

	// DELETE CHARACTER BUTTON
	$(document).on('click', '.remove-character', function() {
		$selectedCharacter = $(this).closest('.list-group-item');
	})

	// CANCEL MODAL CONFIRMATION
	$("#confirm-delete").on(
			"click",
			function() {

				var characterId = $selectedCharacter.find('.remove-character')
						.attr('id');
				deleteCharacterById(characterId);
			})

	// DELETE CHARACTER
	deleteCharacterById = function(id) {

		console.log(id);
		$.ajax({
			method : "POST",
			url : "deleteMyCharacter",
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

	// SEARCH TRYOUT
	$(":checkbox")
			.on(
					"change",
					function() {
						var chosenClass = $(this).val();
						if (this.checked) {
							console.log(chosenClass);
							var $commentsList = $(".comments-list");
							$commentsList.empty();
							$
									.ajax({
										method : "GET",
										url : "getMyCharacters"
									})
									.done(
											function(response) {
												console.log(response);
												for (var i = 0; i < response.length; i++) {
													var currentCharacter = response[i];
													if (currentCharacter.characterClass == chosenClass) {
														renderCharacter(
																currentCharacter.id,
																currentCharacter.name,
																currentCharacter.race,
																currentCharacter.characterClass,
																currentCharacter.level,
																currentCharacter.strength,
																currentCharacter.agility,
																currentCharacter.fortitude,
																currentCharacter.intelligence,
																currentCharacter.magic,
																currentCharacter.luck,
																currentCharacter.swordfighting,
																currentCharacter.acrobatics,
																currentCharacter.defense,
																currentCharacter.investigation,
																currentCharacter.spellcasting,
																currentCharacter.gambit);
													}
												}

											}).fail(function(response) {
										console.log(response);
									})
						}

						console.log("check");
					})

	// SEARCH TRYOUT
	$(":checkbox")
			.on(
					"change",
					function() {
						var chosenRace = $(this).val();
						if (this.checked) {
							console.log(chosenRace);
							var $commentsList = $(".comments-list");
							$commentsList.empty();
							$
									.ajax({
										method : "GET",
										url : "getMyCharacters"
									})
									.done(
											function(response) {
												console.log(response);
												for (var i = 0; i < response.length; i++) {
													var currentCharacter = response[i];
													if (currentCharacter.race == chosenRace) {
														renderCharacter(
																currentCharacter.id,
																currentCharacter.name,
																currentCharacter.race,
																currentCharacter.characterClass,
																currentCharacter.level,
																currentCharacter.strength,
																currentCharacter.agility,
																currentCharacter.fortitude,
																currentCharacter.intelligence,
																currentCharacter.magic,
																currentCharacter.luck,
																currentCharacter.swordfighting,
																currentCharacter.acrobatics,
																currentCharacter.defense,
																currentCharacter.investigation,
																currentCharacter.spellcasting,
																currentCharacter.gambit);
													}
												}

											}).fail(function(response) {
										console.log(response);
									})
						}

						console.log("check");
					})

	getUserCharacters();
})