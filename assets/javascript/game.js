var animals = [{name: "zebra", photo: "assets/images/zebra.jpg"}, {name: "lion", photo: "assets/images/lion.jpg"}, {name: "tiger", photo: "assets/images/tiger.jpg"}, {name: "giraffe", photo: "assets/images/giraffe.jpg"}, {name: "jaguar", photo: "assets/images/jaguar.jpg"}, {name: "leopard", photo: "assets/images/leopard.jpg"}, {name: "gorilla", photo: "assets/images/gorilla.jpg"},{name: "elephant", photo: "assets/images/elephant.jpg"}, {name: "kangaroo", photo: "assets/images/kangaroo.jpg"}, {name: "whale", photo: "assets/images/beluga.jpg"}, {name: "cheetah", photo: "assets/images/cheetah.jpg"}, {name: "penguin", photo: "assets/images/penguins.jpg"}, {name: "dolphin", photo: "assets/images/dolphin.jpg"}, {name: "seal", photo: "assets/images/harbor-seal.jpg"}, {name: "walrus", photo: "assets/images/walrus.jpg"}];  
var wins = 0;
var losses = 0;
var animal;
var animalName;
var display;
var previousGuesses;
var incorrectGuesses;
var remainingIncorrectGuesses;

function beginNewGame() {
	animal = animals[Math.floor(Math.random() * animals.length)];
		animalName = animal.name;
	display = [];

	for (var i = 0; i < animalName.length; i++) {
		display.push('_');
	}
	
	previousGuesses = [];
	incorrectGuesses = [];
	remainingIncorrectGuesses = 6;
	updateDisplay();
}

function arrayContains(arrayToSearch, elementToFind) {
	for (var i = 0; i < arrayToSearch.length; i++) {
		if (arrayToSearch[i] === elementToFind) {
			return true;
		}
	}
	return false; 
}

function updateDisplay() {
	var html = "<div class='panel panel-default'>" + 
		"<ul class='list-group'><li class='list-group-item'>wins: " + wins + "</li>" + 
		"<li class='list-group-item'> losses: " + losses + "</li>" +
		"<li class='list-group-item'> word: " + display.join(" ") + "</li>" +
		"<li class='list-group-item'> incorrect guesses remaining: " + remainingIncorrectGuesses + "</li>" +
		"<li class='list-group-item'> incorrect guesses: " + incorrectGuesses.join(", ") + "</li></ul>";

	document.getElementById("game").innerHTML = html;
}

document.onkeyup = function(event) {
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	// if userGuess already guessed, do nothing - accept next guess
	if (arrayContains(previousGuesses, userGuess)) {
		return;
	// else if user guess correct, update display and check to see if user has won game
	} else {
		previousGuesses.push(userGuess);
		if (arrayContains(animalName, userGuess)) {
			for (var i=0; i < animalName.length; i++) {
				if (animalName[i] === userGuess) {
					display[i] = userGuess;
				}
			}
			if (arrayContains(display,'_')) {
				updateDisplay();
				return; // accept next guess
			} else {
				wins++;
				updateDisplay();
				var animalPhoto = document.getElementById("photo");
				animalPhoto.src = animal.photo;
				beginNewGame();
			}
			// else (user guess is incorrect), add to incorrect guesses array, decrement remaining guesses
			// check to see if user has lost game
			} else {
				incorrectGuesses.push(userGuess);
				remainingIncorrectGuesses--;
				if (remainingIncorrectGuesses === 0) {
					losses++;
					updateDisplay();
					beginNewGame();
				} else {
					updateDisplay();
				}
		}

	}
}
beginNewGame();