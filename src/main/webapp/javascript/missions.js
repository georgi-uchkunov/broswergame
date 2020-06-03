$(function() {

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
						loadCharacter(currentCharacter.id,
								currentCharacter.name, currentCharacter.race,
								currentCharacter.characterClass,
								currentCharacter.level,
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
	var loadCharacter = function(id, name, race, characterClass, level,
			strength, agility, fortitude, intelligence, magic, luck,
			swordfighting, acrobatics, defense, investigation, spellcasting,
			gambit) {

		console.log(id, name, race, characterClass, level, strength, agility,
				fortitude, intelligence, magic, luck, swordfighting,
				acrobatics, defense, defense, spellcasting, gambit);

		var $template = $('#exampleSelect1').html();
		$template = $($template);

		$template.find('#option-one').val(name);
		characterName = $('#option-one').val();
		console.log(characterName);
		
	}


	getUserCharacters();
})