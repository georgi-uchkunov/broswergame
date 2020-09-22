$(function() {

	getAllCharacters = function() {
		$
				.ajax({
					method : "GET",
					url : "getAllCharacters"
				})
				.done(
						function(response) {
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
							createClassChart(classCounter);
							findMostPopularClass(mageCounter, thiefCounter,
									healerCounter, fighterCounter, tankCounter);
							findLeastPopularClass(mageCounter, thiefCounter,
									healerCounter, fighterCounter, tankCounter);

						}).fail(function(response) {
				})
	}

	getAllCharacters02 = function() {
		$.ajax({
			method : "GET",
			url : "getAllCharacters"
		}).done(
				function(response) {
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
					createRaceChart(raceCounter);
					findMostPopularRace(humanCounter, elfCounter, dwarfCounter,
							orcCounter);
					findLeastPopularRace(humanCounter, elfCounter,
							dwarfCounter, orcCounter);

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

	findMostPopularClass = function(mageCounter, thiefCounter, healerCounter,
			fighterCounter, tankCounter) {

		var mostPopular = Math.max(mageCounter, thiefCounter, healerCounter,
				fighterCounter, tankCounter);
		var position = [ mageCounter, thiefCounter, healerCounter,
				fighterCounter, tankCounter ].indexOf(mostPopular);

		switch (position) {
		case 0:
			$('.img-popular-class').attr('src', '../../images/mage_logo.png');
			$('.most-popular-class').text("Mage");
			break;
		case 1:
			$('.img-popular-class').attr('src', '../../images/thief_logo.png');
			$('.most-popular-class').text("Thief");
			break;
		case 2:
			$('.img-popular-class').attr('src', '../../images/healer_logo.png');
			$('.most-popular-class').text('Healer');
			break;
		case 3:
			$('.img-popular-class')
					.attr('src', '../../images/fighter_logo.png');
			$('.most-popular-class').text('Fighter');
			break;
		case 4:
			$('.img-popular-class').attr('src', '../../images/tank_logo.png');
			$('.most-popular-class').text('Tank');
			break;

		}

	}

	findMostPopularRace = function(humanCounter, elfCounter, dwarfCounter,
			orcCounter) {

		var mostPopular = Math.max(humanCounter, elfCounter, dwarfCounter,
				orcCounter);
		var position = [ humanCounter, elfCounter, dwarfCounter, orcCounter ]
				.indexOf(mostPopular);

		switch (position) {
		case 0:
			$('.img-popular-race').attr('src', '../../images/human_icon.png');
			$('.most-popular-race').text('Human');
			break;
		case 1:
			$('.img-popular-race').attr('src', '../../images/elf_logo.png');
			$('.most-popular-race').text('Elf');
			break;
		case 2:
			$('.img-popular-race').attr('src', '../../images/dwarf_logo.png');
			$('.most-popular-race').text('Dwarf');
			break;
		case 3:
			$('.img-popular-race').attr('src', '../../images/orc_logo.png');
			$('.most-popular-race').text('Orc');
			break;

		}

	}

	findLeastPopularClass = function(mageCounter, thiefCounter, healerCounter,
			fighterCounter, tankCounter) {

		var leastPopular = Math.min(mageCounter, thiefCounter, healerCounter,
				fighterCounter, tankCounter);
		var position = [ mageCounter, thiefCounter, healerCounter,
				fighterCounter, tankCounter ].indexOf(leastPopular);

		switch (position) {
		case 0:
			$('.img-least-class').attr('src', '../../images/mage_logo.png');
			$('.least-popular-class').text("Mage");
			break;
		case 1:
			$('.img-least-class').attr('src', '../../images/thief_logo.png');
			$('.least-popular-class').text("Thief");
			break;
		case 2:
			$('.img-least-class').attr('src', '../../images/healer_logo.png');
			$('.least-popular-class').text('Healer');
			break;
		case 3:
			$('.img-least-class').attr('src', '../../images/fighter_logo.png');
			$('.least-popular-class').text('Fighter');
			break;
		case 4:
			$('.img-least-class').attr('src', '../../images/tank_logo.png');
			$('.least-popular-class').text('Tank');
			break;

		}

	}

	findLeastPopularRace = function(humanCounter, elfCounter, dwarfCounter,
			orcCounter) {

		var mostPopular = Math.min(humanCounter, elfCounter, dwarfCounter,
				orcCounter);
		var position = [ humanCounter, elfCounter, dwarfCounter, orcCounter ]
				.indexOf(mostPopular);

		switch (position) {
		case 0:
			$('.img-least-race').attr('src', '../../images/human_logo.png');
			$('.least-popular-race').text('Human');
			break;
		case 1:
			$('.img-least-race').attr('src', '../../images/elf_logo.png');
			$('.least-popular-race').text('Elf');
			break;
		case 2:
			$('.img-least-race').attr('src', '../../images/dwarf_logo.png');
			$('.least-popular-race').text('Dwarf');
			break;
		case 3:
			$('.img-least-race').attr('src', '../../images/orc_logo.png');
			$('.least-popular-race').text('Orc');
			break;

		}

	}

	getMissions = function() {
		$.ajax({
			method : "GET",
			url : "getAllMissions"
		}).done(function(response) {
			var missionsInfo = response.content;
			sortMissions(missionsInfo);
		}).fail(function(response) {
		})
	}

	sortMissions = function(missionsInfo) {
		missionsInfo.sort(function(a, b) {
			return a.timesChosen - b.timesChosen;
		});
		var sortedRanking = [];
		var sortedTitles = [];
		for (var i = 1; i < missionsInfo.length; i++) {
			currentMission = missionsInfo[i];
			sortedRanking.push(currentMission.timesChosen);
			sortedTitles.push(currentMission.title);
		}
		createMissionsChart(sortedRanking, sortedTitles);
	}

	createMissionsChart = function(sortedRanking, sortedTitles) {
		var ctx = document.getElementById('missionsChart').getContext('2d');

		Chart.defaults.global.defaultFontSize = 16;
		Chart.defaults.global.defaultFontColor = 'white';

		var classChart = new Chart(ctx, {
			type : 'bar',
			data : {
				labels : sortedTitles,
				datasets : [ {
					label : 'Mission selected # of times',
					data : sortedRanking,
					backgroundColor : [ 'rgb(0, 0, 230, 0.8)',
							'rgb(255, 0, 0, 0.8)', 'rgb(0, 204, 0, 0.8)',
							'rgb(230, 115, 0, 0.8)', 'rgb(0, 255, 255, 0.8)',
							'rgb(204, 153, 255, 0.8)',
							'rgb(255, 255, 102, 0.8)', 'rgb(153, 102, 255, 0.8)' ],
					pointRadius: 9,
					fill: false,
					borderColor : '#777',
					borderWidth : 1,
					hoverBorderWidth : 3,
					hoverBorderColor : '#000',
				} ]
			},
			options : {
				title : {
					display : true,
					text : 'Mission Popularity',
				},
				scales : {
					yAxes : [ {
						ticks : {
							beginAtZero : true
						},
						display : true
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
	
	getTrainings = function() {
		$.ajax({
			method : "GET",
			url : "getAllTrainings",
		}).done(
				function(response) {
					var trainingInfo = response.content;
					sortTraining(trainingInfo);

				}).fail(function(response) {
		})
	}
	
	sortTraining = function(trainingInfo) {
		trainingInfo.sort(function(a, b) {
			return a.timesChosen - b.timesChosen;
		});
		var sortedRanking = [];
		var sortedTitles = [];
		for (var i = 1; i < trainingInfo.length; i++) {
			currentTraining = trainingInfo[i];
			sortedRanking.push(currentTraining.timesChosen);
			sortedTitles.push(currentTraining.title);
		}
		createTrainingChart(sortedRanking, sortedTitles);
	}
	
	createTrainingChart = function(sortedRanking, sortedTitles) {
		var ctx = document.getElementById('trainingChart').getContext('2d');

		Chart.defaults.global.defaultFontSize = 16;
		Chart.defaults.global.defaultFontColor = 'white';

		var classChart = new Chart(ctx, {
			type : 'line',
			data : {
				labels : sortedTitles,
				datasets : [ {
					label : 'Training selected # of times',
					data : sortedRanking,
					backgroundColor : [ 'rgb(0, 0, 230, 0.8)',
							'rgb(255, 0, 0, 0.8)', 'rgb(0, 204, 0, 0.8)',
							'rgb(230, 115, 0, 0.8)', 'rgb(0, 255, 255, 0.8)',
							'rgb(204, 153, 255, 0.8)',
							'rgb(255, 255, 102, 0.8)', 'rgb(153, 102, 255, 0.8)' ],
					pointRadius: 9,
					fill: false,
					borderColor : '#777',
					borderWidth : 1,
					hoverBorderWidth : 3,
					hoverBorderColor : '#000',
				} ]
			},
			options : {
				title : {
					display : true,
					text : 'Training Popularity'
				},
				scales : {
					yAxes : [ {
						ticks : {
							beginAtZero : true
						},
						display : true
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
	
	
	setAdminResources = function() {
		$.ajax({
			method : "POST",
			url : "setAdminResources",
		}).done(function(response) {

		});
	}
	
	
	getTrainings();
	getMissions();
	setAdminResources();
	getAllCharacters();
	getAllCharacters02();

})