var inquirer = require("inquirer");
var Word = require("./word.js");
var Letter = require("./letter.js");

//create an array of possible words
var possibleWords = ["words", "letters", "asterisk", "colon", "semicolon"];
var word;
var guesses;

function playGame(){
	//reset guesses & word
	guesses = 12;
	word = "";

	//randomly pick word from array and create new Word
	var random = Math.floor(Math.random() * possibleWords.length);
	chosenWord = possibleWords[random];
	word = new Word(possibleWords[random]);
	word.createLetters();

	//display spaces for each Letter within Word
	word.displaySpaces();
	guesser();
	
};

function guesser(){
	//if word is complete, alert of win, skip to play again prompt
	if(word.word.findIndex(x => x.space == "_") == -1){
		console.log("You won!");
		playAgain();
	}
	
	//if word is incomplete, check # of guesses. if > 0 and word is incomplete:
	else if(guesses > 0){
		//recursive inquirer prompt for guess
		inquirer.prompt([
			{
				type: "input",
				name: "guess",
				message: "Guess a letter: "
			}
		]).then(function(response){
			//check if the word contains the guess
			var correct = word.containsLetter(response.guess);
			
			//if guess is correct, replace corresponding space(s) with correct letter, guesses-- and prompt next guess
			if (correct === true)
			{
				if(word.word.findIndex(x => x.space == "_") < 0){
					word.correctLetter(response.guess);
					console.log("You won!");
					playAgain();
				}
				word.correctLetter(response.guess);
				guesses--;
				console.log(`Guesses remaining: ${guesses}`);
				guesser();
			}
			//if guess is incorrect, display spaces, guesses-- and prompt next guess
			else{
				word.displaySpaces();
				guesses--;
				console.log(`Guesses remaining: ${guesses}`);
				guesser();
			}
		});
			
	}
	
	//if word is incomplete and guesses = 0, alert of loss, play again prompt
	else{
		console.log(`You lost. The correct word was ${chosenWord}. Better luck next time!`);
		playAgain();
	}
};

function playAgain(){
	//confirm if user would like to play again, allow recursion of playGame
	inquirer.prompt([{
		type: "list",
		name: "playAgain",
		message: "Would you like to play again?",
		choices: ["YES", "NO"]
	}]).then(function(response){
		//if yes
		if (response.playAgain == "YES"){
			playGame();
		}

		//if no
		else{
			return;
		}
	});
};

//upon start, have user press any key to start game
inquirer.prompt([{
	name: "playGame",
	type: "confirm",
	message: "Welcome to Command Line Hangman! Would you like to play?",
	default: " "
}]).then(function(response, err){
	if (err) console.error(err);
	else if (response.playGame == true) {
		playGame();
	}

	else return;
});