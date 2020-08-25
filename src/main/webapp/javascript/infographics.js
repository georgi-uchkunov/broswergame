$(function() {

	getAllCharacters = function() {
		$
				.ajax({
					method : "GET",
					url : "getAllCharacters"
				})
				.done(
						function(response) {
							console.log(response.content);
							var mageCounter = 0;
							var thiefCounter = 0;
							var healerCounter = 0;
							var fighterCounter = 0;
							var tankCounter = 0;

							for (var i = 0; i < response.content.length; i++) {
								var currentCharacter = response.content[i];

								if (currentCharacter.characterClass == "Mage") {
									var mageCounter = mageCounter + 1;
								} else if (currentCharacter.characterClass == "Thief") {
									var thiefCounter = thiefCounter + 1;
								} else if (currentCharacter.characterClass == "Healer") {
									var healerCounter = healerCounter + 1
								} else if (currentCharacter.characterClass == "Fighter") {
									var fighterCounter = fighterCounter + 1
								} else if (currentCharacter.characterClass == "Tank") {
									var tankCounter = tankCounter + 1;
								}

							}

							var classCounter = [ mageCounter, thiefCounter,
									healerCounter, fighterCounter, tankCounter ];
							console.log(classCounter);
							createClassChart(classCounter);

						}).fail(function(response) {
				})
	}

	getAllCharacters02 = function() {
		$.ajax({
			method : "GET",
			url : "getAllCharacters"
		}).done(
				function(response) {
					console.log(response.content);
					var humanCounter = 0;
					var elfCounter = 0;
					var dwarfCounter = 0;
					var orcCounter = 0;

					for (var i = 0; i < response.content.length; i++) {
						var currentCharacter = response.content[i];

						if (currentCharacter.race == "Human") {
							var humanCounter = humanCounter + 1;
						} else if (currentCharacter.race == "Elf") {
							var elfCounter = elfCounter + 1;
						} else if (currentCharacter.race == "Dwarf") {
							var dwarfCounter = dwarfCounter + 1
						} else if (currentCharacter.race == "Orc") {
							var orcCounter = orcCounter + 1
						}

					}

					var raceCounter = [ humanCounter, elfCounter, dwarfCounter,
							orcCounter ];
					console.log(raceCounter);
					createRaceChart(raceCounter);

				}).fail(function(response) {
		})
	}

	createClassChart = function(classCounter) {
		var ctx = document.getElementById('classChart').getContext('2d');

		Chart.defaults.global.defaultFontSize = 16;
		Chart.defaults.global.defaultFontColor = 'white';

		var classChart = new Chart(ctx, {
			type : 'pie',
			data : {
				labels : [ 'Mage', 'Thief', 'Healer', 'Fighter', 'Tank' ],
				datasets : [ {
					label : '# of heroes of a certain class',
					data : classCounter,
					backgroundColor : [ 'rgb(255, 0, 255, 0.8)',
							'rgb(0, 255, 0, 0.8)', 'rgb(26, 117, 255, 0.8)',
							'rgb(255, 26, 26, 0.8)', 'rgb(255, 204, 0, 0.8)' ],
					borderColor : '#777',
					borderWidth : 1,
					hoverBorderWidth : 3,
					hoverBorderColor : '#000',
				} ]
			},
			options : {
				title : {
					display : true,
					text : 'Classes by # of existing heroes',
				},
				scales : {
					yAxes : [ {
						ticks : {
							beginAtZero : true
						},
						display : false
					} ]
				},
				legend : {
					position : 'right',
					padding : {
						left : '0'
					}
				}
			}
		});
	}

	createRaceChart = function(raceCounter) {
		var ctx = document.getElementById('raceChart').getContext('2d');

		Chart.defaults.global.defaultFontSize = 16;
		Chart.defaults.global.defaultFontColor = 'white';

		var classChart = new Chart(ctx, {
			type : 'doughnut',
			data : {
				labels : [ 'Human', 'Elf', 'Dwarf', 'Orc' ],
				datasets : [ {
					label : '# of heroes of a certain race',
					data : raceCounter,
					backgroundColor : [ 'rgb(0, 0, 230, 0.8)',
							'rgb(255, 0, 0, 0.8)', 'rgb(0, 204, 0, 0.8)',
							'rgb(230, 115, 0, 0.8)' ],
					borderColor : '#777',
					borderWidth : 1,
					hoverBorderWidth : 3,
					hoverBorderColor : '#000',
				} ]
			},
			options : {
				title : {
					display : true,
					text : 'Races by # of existing heroes',
				},
				scales : {
					yAxes : [ {
						ticks : {
							beginAtZero : true
						},
						display : false
					} ]
				},
				legend : {
					position : 'right',
					padding : {
						left : '0'
					}
				}
			}
		});
	}

	getAllCharacters();
	getAllCharacters02();

})