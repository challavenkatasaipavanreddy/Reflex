const gameTitle = document.querySelector(".game-title");
const clickArea = document.querySelector(".click-area");
const displayText = document.querySelector(".display-text");
const scoreElements = document.querySelectorAll(".score");

const scoreHistory = [];
const Minimum_Ms_Till_Change = 3000;
const Maximum_Ms_Till_Change = 5000;

let msSinceEpochOnTimeout = 0;
let waitingForClick = false;
let gameTimer;


function getAnimalBackground(animalName) {
    const bgs = {
        "A Housefly reaction time! Is that an accident or did you cheat?": "assets/fly-bg.png",
        "A mongoose reaction time!": "assets/mongoose-bg.png",
        "A House Cat reaction time!": "assets/cat-bg.png",
        "A Pro-Gamer reaction time!": "assets/gamer-bg.png",
        "Just an Average Human reaction Time.": "assets/human-bg.png",
        "An Elephant reaction Time! Steady but slow.": "assets/elephant-bg.png",
        "A Tortoise reaction Time! Take your time...": "assets/tortoise-bg.png",
        "Did a sloth clicked now?": "assets/sloth-bg.png"
    };
    return bgs[animalName] || "";
}

function getAnimal(score) {
    if (score < 30) return "A Housefly reaction time! Is that an accident or did you cheat?";
    if (score < 100) return "A mongoose reaction time!";
    if (score < 150) return "A House Cat reaction time!";
    if (score < 200) return "A Pro-Gamer reaction time!";
    if (score < 300) return "Just an Average Human reaction Time.";
    if (score < 450) return "An Elephant reaction Time! Steady but slow.";
    if (score < 650) return "A Tortoise reaction Time! Take your time...";
    return "Did a sloth clicked now?";
}

function play() {
    gameTitle.style.display = "none";
    displayText.classList.remove("pulse");
    clickArea.style.backgroundImage = "none";
    clickArea.style.backgroundColor = "#950000";
    displayText.textContent = "Wait for Green...";
    
    waitingForClick = false;
    
    const msTillChange = Math.floor(Math.random() * (Maximum_Ms_Till_Change - Minimum_Ms_Till_Change)) + Minimum_Ms_Till_Change;
    
    gameTimer = setTimeout(() => {
        msSinceEpochOnTimeout = Date.now();
        clickArea.style.backgroundColor = "#009578";
        displayText.textContent = "CLICK NOW!";
        waitingForClick = true;
    }, msTillChange);
}

function showFinalRank() {
    const sum = scoreHistory.reduce((a, b) => a + b, 0);
    const Average = Math.floor(sum / 5);
    const finalAnimal = getAnimal(Average);

    displayText.innerHTML = `ROUND OVER!<br> Average: ${Average}ms<br> ${finalAnimal}!<br><br>Click to start a NEW GAME.`;
    
    clickArea.style.backgroundImage = `url('${getAnimalBackground(finalAnimal)}')`;

    scoreHistory.length = 0;
    displayText.innerHTML = `ROUND OVER!<br> Average: ${Average}ms<br> ${finalAnimal}!<br><br>Click to start a NEW GAME.`;
}

function addScore(score) {
    scoreHistory.unshift(score);
    const animal = getAnimal(score);
    
    clickArea.style.backgroundImage = `url('${getAnimalBackground(animal)}')`;
    
    for (let i = 0; i < scoreElements.length; i++) {
        if (scoreHistory[i] !== undefined) {
            scoreElements[i].textContent = `${scoreHistory[i]}ms`;
        } else {
            scoreElements[i].textContent = "-";
        }
    }

    if (scoreHistory.length === 5) {
        displayText.textContent = `Your Time: ${score}ms. ${animal} CLICK TO SEE YOUR AVERAGE REACTION TIME!`;
    } else {
        displayText.textContent = `Your Time: ${score}ms. ${animal} Click to continue....`;
    }
}

clickArea.addEventListener("pointerdown", () => {
    if (waitingForClick) {
        const score = Date.now() - msSinceEpochOnTimeout;
        waitingForClick = false;
        addScore(score);
    } else {
        const currentText = displayText.textContent;

        if (currentText.includes("CLICK TO SEE YOUR AVERAGE REACTION TIME!")) {
            showFinalRank();
        } else if (currentText.includes("NEW GAME") || currentText.includes("Welcome")) {
            if (currentText.includes("NEW GAME")) {
                 scoreElements.forEach(el => el.textContent = "-");
            }
            play();
        } else if (currentText === "Wait for Green...") {
             clearTimeout(gameTimer);
             displayText.textContent = "Too early! Click to try again.";
             clickArea.style.backgroundColor = "#950000";
             clickArea.style.backgroundImage = "none";
        } else {
            play();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    clickArea.style.backgroundImage = "url('assets/start-bg.png')";
    gameTitle.style.display = "block";
    displayText.classList.add("pulse"); 
    displayText.textContent = "Welcome. Click to start the game!";
});
