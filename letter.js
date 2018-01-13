function Letter(letter){
	this.letter = letter;
	this.space = "_"; 
	this.correctGuess = function(){
		this.space = this.letter;
	}
}

module.exports = Letter;