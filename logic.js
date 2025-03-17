let gamesqq = []; 
let user = [];
let level = 0;
let previous_level = { player1: 0, player2: 0 };
let start_game = false;
let players = {};
let current_player = "player1";

let h2 = document.querySelector("h2");
let h5_player1 = document.querySelector("#p1");
let h5_player2 = document.querySelector("#p2");
let bts = ["yellow", "red", "green", "blue"];
let startButton = document.querySelector("button");

// Start Game when Button is Clicked with Countdown
startButton.addEventListener("click", function () {
    if (!start_game) {
        let countdown = 3;
        h2.innerText = `Starting in ${countdown}...`;
        
        let countdownInterval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                h2.innerText = `Starting in ${countdown}...`;
            } else {
                clearInterval(countdownInterval);
                startNewGame();
            }
        }, 1000);
    }
});

// Start the new game
function startNewGame() {
    let name1 = document.querySelector("#name1").value || "Player 1";
    let name2 = document.querySelector("#name2").value || "Player 2";

    players = { player1: name1, player2: name2 };
    previous_level = { player1: 0, player2: 0 };

    start_game = true;
    current_player = "player1";
    level = 0;
    gamesqq = [];
    levelUp();
}

// Generate a new level sequence
function levelUp() {
    user = [];
    level++;
    h2.innerText = `${players[current_player]}'s Turn - Level ${level}`;

    let ran = Math.floor(Math.random() * 4);
    let rancolour = bts[ran];
    let bts_rand = document.querySelector(`.${rancolour}`);
    flash(bts_rand);

    gamesqq.push(rancolour);
    console.log("Game Sequence:", gamesqq);
}

// Flash Button
function flash(button) {
    button.classList.add("flash");
    setTimeout(() => {
        button.classList.remove("flash");
    }, 500);
}

// Handle Button Clicks
function bts_click() {
    let colou = this.classList[1];
    user.push(colou);
    flash(this);
    console.log(`${players[current_player]}'s Sequence:`, user);

    checkAnswer(user.length - 1);
}

// Check User's Input
function checkAnswer(currentLevel) {
    if (user[currentLevel] === gamesqq[currentLevel]) {
        if (user.length === gamesqq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = `Game Over! ${players[current_player]} lost at Level ${level}`;
        updateHighScore();
        switchPlayer();
    }
}

// Switch to the Next Player
function switchPlayer() {
    previous_level[current_player] = level - 1;

    if (current_player === "player1") {
        current_player = "player2";
        gamesqq = [];
        level = 0;
        user = [];
        setTimeout(levelUp, 2000);
    } else {
        compareScores();
    }
}

// Update High Score Display
function updateHighScore() {
    h5_player1.innerText = `${players.player1}'s Highest Score: ${previous_level.player1}`;
    h5_player2.innerText = `${players.player2}'s Highest Score: ${previous_level.player2}`;
}

// Compare Scores After Both Players Finish
function compareScores() {
    let winner;
    if (previous_level.player1 > previous_level.player2) {
        winner = players.player1;
    } else if (previous_level.player2 > previous_level.player1) {
        winner = players.player2;
    } else {
        winner = "It's a tie!";
    }

    h2.innerText = `Game Over! Winner: ${winner}`;
    resetGame();
}

// Reset the Game
function resetGame() {
    level = 0;
    gamesqq = [];
    user = [];
    start_game = false;
}

// Attach event listeners after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    let bts_all = document.querySelectorAll(".bts");
    bts_all.forEach(btn => btn.addEventListener("click", bts_click));
});
