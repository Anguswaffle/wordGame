// Click start button
// Word is randomly chosen, clock countdown begins from 10
// Length of word displayed in _, original word has default state of hidden
// Everytime user keys down a letter, it is checked against all letters in hidden word
// If the word contains a key that is pressed, its state is changed and letter is revealed
// When all letters are revealed, user gets a congratulatory message, timer stops
// Win is logged in local storage
// If clock reaches 0 before word is guessed, user loses and loss is logged in local storage


var wordList = ["orange", "blue", "pink", "banana"]

var startBtn = document.querySelector(".start-button");
var wordToBeGuessed = document.querySelector(".large-font-word-blanks");
var resetBtn = document.querySelector(".reset-button");
var timeLeft = document.querySelector(".large-font-timer-count");
var chosenWord = "";
var blankWord = "";


// Produces a random number
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Replaces chosen word with a string containing an equal amount of blank spots
function replaceWord(string) {
    for (var i = 0; i < string.length; i++) {
        blankWord += "_";
    }
    return blankWord;
}

// Replaces a character at a given index in a string
function replaceAt(string, index, replacement) {
    return string.substr(0, index) + replacement + string.substr(index + 1);
}
    
function resetWord() {
    blankWord = "";
}

// Starts the game when Start button is pressed
startBtn.addEventListener("click", function (event) {
    event.preventDefault();

    resetWord();
    chosenWord = wordList[getRandomInt(wordList.length)];

    wordToBeGuessed.innerHTML = replaceWord(chosenWord);

});


// Checks chosen letter against letters in chosen word then replaces all matching letters
document.addEventListener("keydown", function (event) {
    event.preventDefault();

    var guessedLetter = event.key.toLowerCase();
    if (chosenWord.includes(guessedLetter)) {
        for (var i = 0; i < chosenWord.length; i++)
            if (chosenWord.charAt(i) === guessedLetter) {
                if(i === 0) {
                    guessedLetter = guessedLetter.toUpperCase();
                }
                blankWord = replaceAt(blankWord, i, guessedLetter);
                wordToBeGuessed.innerHTML = blankWord;
            }
    }

    if(blankWord.toLowerCase() === chosenWord && !event.metaKey) {
        alert("You win!")
        resetWord();
    }
});