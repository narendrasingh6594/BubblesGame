
const loadScreen = document.getElementById('loadScreen');
const loadPercent = document.getElementById('loadPercent');
let pct = 0;
const loadTimer = setInterval(() => {
    pct += Math.floor(Math.random() * 12) + 5;
    if (pct >= 100) {
        pct = 100;
        loadPercent.textContent = pct + '%';
        clearInterval(loadTimer);
        setTimeout(() => { loadScreen.classList.add('done'); }, 300);
        return;
    }
    loadPercent.textContent = pct + '%';
}, 180);

document.getElementById('letsGoBtn').addEventListener('click', () => {
    window.location.href = "./aboutepage.html";
});

let timebustAmounts = localStorage.getItem("timebustAmount") || 0;  
let fire = localStorage.getItem("fireAmounts") || 0;
let life = localStorage.getItem("lifeAmounts") || 0;
let shield = localStorage.getItem("shieldAmounts") || 0;

//mini-amounts
const timebustAmount = document.getElementById("timebustAmount");
const fireAmount = document.getElementById("fireAmount");
const lifeAmount = document.getElementById("lifeAmount");
const shieldAmount = document.getElementById("shieldAmount");

//minichipAmount.textContent = minichips;
timebustAmount.textContent = timebustAmounts;
fireAmount.textContent = fire;
lifeAmount.textContent = life;
shieldAmount.textContent = shield;

//coin
const coin = document.getElementById("coin");
const coinCount = document.getElementById("coinAmount");
console.log(coinCount);

 let coins = parseInt(localStorage.getItem("coins")) || 0;
 console.log(coins);
 
coinCount.textContent = coins;

//quickStats
let bestscore = localStorage.getItem("bestScore") || 0;
document.getElementsByClassName("statChip")[0].querySelector("b").textContent = bestscore;
let gamesPlayed = localStorage.getItem("gamesPlayed") || 0;
document.getElementsByClassName("statChip")[1].querySelector("b").textContent = gamesPlayed;
let totalCoins = localStorage.getItem("coins") || 0;
document.getElementsByClassName("statChip")[2].querySelector("b").textContent = "💸 " + totalCoins;  
// Buy Item 

let statusBar = document.getElementById("icon");
console.log(statusBar);

const buyButtons = document.querySelectorAll(".btn-buy");

buyButtons.forEach(button => {
    button.addEventListener("click", function () {

        const card = this.closest(".shopCard");

        const item = {
            name: card.querySelector("h3").innerText,
            price: card.querySelector(".shopPrice").innerText,
            icon: card.querySelector(".shopIcon").innerText,
            owned: card.querySelector(".qtyTag").innerText,
           
            };
        localStorage.setItem("buyItem", JSON.stringify(item));
        window.location.href = "buycard.html";

    });
});
 
const loadScreen = document.getElementById("loadScreen");
const loadPercent = document.getElementById("loadPercent");

function runLoader(){
    if(localStorage.getItem("bubbleGameLoaded")){
        loadScreen.style.display = "none";
        return;
    }

    let percent = 0;
    let step = 1;

    function tick(){
        percent += step;
        if(percent >= 100){
            percent = 100;
        }
        loadPercent.textContent = percent + "%";

        if(percent < 100){
            step += Math.floor(Math.random()*5) + 2;
            setTimeout(tick, 150 + Math.random()*180);
        } else {
            localStorage.setItem("bubbleGameLoaded", "true");
            setTimeout(() => {
                loadScreen.style.display = "none";
            }, 1000);
        }
    }

    tick();
}
runLoader();

//let totalClicks = 10;
let score = 0;
let target = 0;
let bombTarget = 0;
let targetsum = 0;
let gameOver = false;
let lives = 3;
let TimeOutLoop = 120; 
let medals = document.getElementById("Medals");
let timer = null;
let isPaused = false;


// start button 
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const game = document.querySelector(".game");

//

const man = document.querySelector(".man");
const TimeOut = document.getElementById("time");
const scoreSpan = document.getElementById("score");
const targetSpan = document.getElementById("target");
const banner = document.getElementById("banner");
const livesSpan = document.getElementById("lives");
const gameOverCard = document.getElementById("gameOverCard");
const topline = document.getElementById("top");
const StopTime = document.getElementById("stoptime");
const rulesCard = document.getElementById("rulesCard");
const gotitbtn = document.getElementById("gotItBtn");
TimeOut.innerText = TimeOutLoop;

gotitbtn.addEventListener("click", function () {
    rulesCard.classList.remove("show");
       startScreen.style.display = "none";
   
    game.style.display = "block";
     setNewTarget();
    createBubbles(100);
    startTimer(); 
    
});
 
const lifepositions = [];
const bumpPositions = [];
const TwoNumberBubblesPositions = [];
function AddLives(count) {
     while (lifepositions.length < 3) {
        let pos = Math.floor(Math.random() * count);
        if (!lifepositions.includes(pos)) {
            lifepositions.push(pos);
        }
    }
}

function AddBump(count) {
     while (bumpPositions.length < 10) {
        let poss = Math.floor(Math.random() * count);
        // life aur bomb dono ek hi bubble par overlap na ho
        if (!bumpPositions.includes(poss) && !lifepositions.includes(poss)) {
            bumpPositions.push(poss + 1 );
        }
    }
}

function setNewTarget(){
    target = score + (Math.floor(Math.random()*10)+1); 
    targetSpan.innerText = target;
    if (target >= 1 && target <= 3) {
            setTimeout(() => {
            setNewTarget();
            }, 100); 
          }
}

function BonasScore(count) {
         while (TwoNumberBubblesPositions.length < 5) {
        let posses = Math.floor(Math.random() * count);
      
        if (!bumpPositions.includes(posses) && !lifepositions.includes(posses) && !TwoNumberBubblesPositions.includes(posses)) {
           TwoNumberBubblesPositions.push(posses);
        }
    }
   
}
    
function showBanner(text){
    banner.textContent = text;
    banner.classList.add("show");
    setTimeout(()=>{
        banner.classList.remove("show");
    },1500);
}
function StopTimerFunction() {

    if (!isPaused) {
        // PAUSE
        isPaused = true;
        StopTime.innerHTML = "▶";
    } else {
        // RESUME
        isPaused = false;
        StopTime.innerHTML = "▐▐";
    }

}

StopTime.addEventListener("click", StopTimerFunction);
function startTimer() {

    timer = setInterval(() => {

        if (gameOver || isPaused) return;

        TimeOutLoop--;
        TimeOut.innerText = TimeOutLoop;

        if (TimeOutLoop <= 0) {
            clearInterval(timer);
            gameOver = true;

            showBanner("⏰ Time Over!");

            setTimeout(() => {
                showResult();
            }, 1000);
        }

    }, 1000);
}

function showResult() {

    gameOverCard.style.display = "flex";

    document.getElementById("finalScore").innerText = score;
    document.getElementById("finalTarget").innerText = target;
    document.getElementById("finalBomb").innerText = bombTarget;
    document.getElementById("finalTargetSum").innerText = targetsum;
    document.getElementById("Timeoutline").innerText = TimeOutLoop;
    document.getElementById("restartBtn").addEventListener("click", function() {
        location.reload();
    });

    const title = document.getElementById("resultTitle");

if (score >= 500) {
    medals.innerHTML = "💎 Grand Master";
}
else if (score >= 310) {
    medals.innerHTML = "🏆 Champion";
}
else if (score >= 170) {
    medals.innerHTML = "🥇 Gold";
}
else if (score >= 100) {
    medals.innerHTML = "🥈 Silver";
}
else if (score >= 50) {
    medals.innerHTML = "🥉 Bronze";
}
else {
    medals.innerHTML = "🎖️ Beginner";
}

    if (targetsum >= 3) {
        title.innerHTML = "🏆 YOU WIN";
        title.style.color = "lime";
        return;
    } else if (bombTarget == 3 || lives == 0) {
        title.innerHTML = "💣 GAME OVER";
        title.style.color = "red";
    } else if (TimeOutLoop == 0) {
        title.innerHTML = "⏰ Time Over!";
        title.style.color = "#ff3b3b";
    }
     else {
       title.innerHTML = "💀 GAME OVER";
       title.style.color = "#ff3b3b";
    }
}

function updateLives() {
    if(lives === 6){
        livesSpan.innerHTML = "❤️❤️❤️❤️❤️❤️";
    }
     else if (lives === 5) {
        livesSpan.innerHTML = "❤️❤️❤️❤️❤️";
    }
     else if (lives === 4) {
        livesSpan.innerHTML = "❤️❤️❤️❤️";
    }else if (lives === 3) {
        livesSpan.innerHTML = "❤️❤️❤️";
    }
    else if (lives === 2) {
        livesSpan.innerHTML = "❤️❤️🤍";
    }
    else if (lives === 1) {
        livesSpan.innerHTML = "❤️🤍🤍";
    }
    else {
        livesSpan.innerHTML = "🤍🤍🤍";
    }

}
updateLives();
function resurtTimeout() {
    setTimeout(() => {
        showResult();
    }, 1000);
}

function createBubbles(count){
    for(let i=1;i<=count;i++){

        let randomNumber = Math.floor(Math.random()*10)+1;

        const bubble = document.createElement("div");
        bubble.classList.add("bubbles");
        bubble.textContent = "";

        if (lifepositions.includes(i)) {
            bubble.dataset.life = "true";
            bubble.classList.add("life");
        }

        if (bumpPositions.includes(i)) {
            bubble.dataset.bump = "true";
        }
        
        if (TwoNumberBubblesPositions.includes(i)) {
            bubble.dataset.ScoreTwo = "true";
        }

        bubble.addEventListener("click",function(){
            if (gameOver || isPaused) {
                return;
            }

            if (this.classList.contains("opened")) {
                return;
            }
            this.classList.add("opened");

            // Life bubble: independent of number/bomb logic, always heals a life
            if (this.dataset.life === "true") {
                this.textContent = "❤️";
                showBanner("❤️ Life Bubble! You gained a life!");
                bombTarget = Math.max(0, bombTarget - 1); 
                lives += 1;
                updateLives();
                return;
            }

            bubble.dataset.number = randomNumber;
            this.textContent = this.dataset.number;

            let number = Number(this.dataset.number);
            let isBomb = this.dataset.bump === "true";
            let isScoreTwo = this.dataset.ScoreTwo === "true";
            if (isBomb) {
                bubble.textContent = "💣";
                bubble.classList.add("bomb");
                bombTarget += 1;
                lives -= 1;
                updateLives();
                if(bombTarget === 3){
                    showBanner("💣 Bomb Target Reached! Game Over!");
                    resurtTimeout();
                    gameOver = true;
                }
                score -= number;
                if (score <= 0) {
                    score = 0;
                }
            } else if (isScoreTwo) {
                bubble.textContent = number + "×2";
                bubble.classList.add("scoreTwo");
                bubble.style.whiteSpace = "nowrap";
                bubble.style.fontSize = "13px";
                bubble.classList.add("scoreTwo");
                score += number * 2;
                showBanner(" Bonus! Score Doubled!");
            } else {
                score += number;
            }
            scoreSpan.innerText = score;

            if(score === target && !isBomb){
                targetsum += 1;
                bubble.classList.add("target");
                if(targetsum === 3){
                    resurtTimeout();
                    gameOver = true;
                } else {
                    setNewTarget();
                }
            }
        });
        man.appendChild(bubble);
    }
}

startBtn.addEventListener("click", function () {
    
   game.classList.add("show");
   rulesCard.classList.add("show");
     AddLives(100); 
    AddBump(100);
   BonasScore(100);
 //topline.style.display = "flax";
});
