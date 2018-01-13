var Letter = require("./letter.js");

function Word(newWord){
	this.numLetters = newWord.length;
	
	//create an array to hold Letter objects
	this.word = [];

	this.createLetters = function(){
		//loop through each letter in the Word and create a Letter object, push to this.word array
		for (i = 0; i < newWord.length; i++){
			var letter = new Letter(newWord[i]);
			this.word.push(letter);
		}
	};

	this.displaySpaces = function(){
		//creates a string to display all of the letter.space values in the word array
		var spaces = [];
		for (i = 0; i < this.word.length; i++)
			{
				spaces.push(this.word[i].space);
			}
		var spacesString = spaces.toString();
		spacesString = spacesString.replace(/,/g, " ");
		console.log(spacesString);
	};

	this.containsLetter = function(guess){
		//if word contains the letter, return true
		if (newWord.indexOf(guess) > -1) return true;
		//if word does not contain the letter, return false
		else return false;
	};

	this.correctLetter = function(guess){
		//replaces the value of Letter.space with the value of Letter.letter

		//where word[index].letter == guess, find the index
		var wordArray = this.word;
		var guessIndex = wordArray.findIndex(x => x.letter == guess);
		
		//replace underscore in Letter.space with letter value
		this.word[guessIndex].correctGuess();

		//search for if the letter occurs again in the word
		guessIndex = wordArray.findIndex(x => x.letter == guess && x.space == "_");
		while (guessIndex > -1)
		{
			this.word[guessIndex].correctGuess();
			guessIndex = wordArray.findIndex(x => x.letter == guess && x.space == "_");
		}

		//displays updated spaces
		this.displaySpaces();
	};
}

module.exports = Word;