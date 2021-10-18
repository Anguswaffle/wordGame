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
var wordEl = document.querySelector(".large-font-word-blanks");
var resetBtn = document.querySelector(".reset-button");
var timerEl = document.querySelector(".large-font-timer-count");
var winsEl = document.querySelector(".win");
var lossesEl = document.querySelector(".lose");
var chosenWord = "";
var blankWord = "";



// Checking to see if local storage has an object named "stats." 
// If true, the stats will be displayed in the HTML element
// If false, an object named "stats" will be created and stored in local storage
function gameCheck() {
    if(localStorage.getItem("stats") === null){
        var stats = {
            wins: 0,
            losses: 0
        };
        localStorage.setItem("stats", JSON.stringify(stats));
        displayStats();
    } else {
        displayStats();
    }
}


function displayStats() {
    var stats = JSON.parse(localStorage.getItem("stats"));
        winsEl.innerHTML = stats.wins;
        lossesEl.innerHTML = stats.losses;
}

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

function resetGame() {
    blankWord = "";
    chosenWord = "";
    gameCheck();
}

function userLoses() {
    var stats = JSON.parse(localStorage.getItem("stats"))
    stats.losses++;
    localStorage.setItem("stats", JSON.stringify(stats));
    alert("You ran out of time and lost.")
    resetGame();
}

function userWins() {
    var stats = JSON.parse(localStorage.getItem("stats"))
    stats.wins++;
    localStorage.setItem("stats", JSON.stringify(stats));
    alert("You've won!");
    resetGame();
}

function countdown() {
    var timeLeft = 10;

    var timeInterval = setInterval(function () {
        timeLeft = timeLeft - .25;
        timerEl.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            userLoses();
        } else if (blankWord.toLowerCase() === chosenWord) {
            clearInterval(timeInterval);
            userWins();
        }
    }, 250);
}

// Starts the game when Start button is pressed
startBtn.addEventListener("click", function (event) {
    event.preventDefault();

    chosenWord = wordList[getRandomInt(wordList.length)];

    wordEl.innerHTML = replaceWord(chosenWord);
    countdown();

});

// Clears local storage and resets stats to 0 when reset button is pressed
resetBtn.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    gameCheck();
})

// Checks chosen letter against letters in chosen word then replaces all matching letters
document.addEventListener("keydown", function (event) {
    event.preventDefault();

    var guessedLetter = event.key.toLowerCase();
    if (chosenWord.includes(guessedLetter)) {
        for (var i = 0; i < chosenWord.length; i++)
            if (chosenWord.charAt(i) === guessedLetter) {
                if (i === 0) {
                    guessedLetter = guessedLetter.toUpperCase();
                }
                blankWord = replaceAt(blankWord, i, guessedLetter);
                wordEl.innerHTML = blankWord;
            }
    }
});

resetGame();