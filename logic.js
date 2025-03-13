let gamesqq = [];
let user = [];

let level = 0;
let previous_level = 0;
let start_game = false;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let bts = ["yellow", "red", "green", "blue"];

document.addEventListener("keypress", function () {
    if (!start_game) {  
        start_game = true;
        levelUp();
    }
});

function levelUp() {
    user = []; 
    level++;
    h2.innerText = `Level ${level}`;
    
    let ran = Math.floor(Math.random() * 4); 
    let rancolour = bts[ran];
    let bts_rand = document.querySelector(`.${rancolour}`);
    flash(bts_rand);
    
    gamesqq.push(rancolour);
    console.log("Game Sequence:", gamesqq);
}

function flash(button) {
    button.classList.add("flash"); 
    setTimeout(() => {
        button.classList.remove("flash");
    }, 500);
}

function bts_click() {
    let colou = this.classList[1];
    user.push(colou);
    flash(this);
    console.log("User Sequence:", user);

    checkAnswer(user.length - 1);
}

function checkAnswer(currentLevel) {
    if (user[currentLevel] === gamesqq[currentLevel]) {
        if (user.length === gamesqq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = "Game Over! Press any key to restart.";
        if (level > previous_level) {
            previous_level = level - 1;
        }
        h3.innerText = `Your highest score is: ${previous_level}`;
        resetGame();
    }
}

function resetGame() {
    level = 0;
    gamesqq = [];
    user = [];
    start_game = false;
}

let bts_all = document.querySelectorAll(".bts"); 
bts_all.forEach(btn => btn.addEventListener("click", bts_click));
