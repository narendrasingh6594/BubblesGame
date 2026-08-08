function AllFunctionRunning() {
//Shilds 
let shildclick = false;
let lastClickedBubble = null;

let shieldAmount = document.getElementById("shieldAmount");
let shieldAmounts = parseInt(localStorage.getItem("shieldAmounts")) || 0;
shieldAmount.textContent = shieldAmounts;   

let lifeAmount = document.getElementById("lifeAmount");
let lifeAmounts = parseInt(localStorage.getItem("lifeAmounts")) || 0;
lifeAmount.textContent = lifeAmounts;

let fireAmount = document.getElementById("fireAmount");
let fireAmounts = parseInt(localStorage.getItem("fireAmounts")) || 0;
fireAmount.textContent = fireAmounts;

let timebustAmount = document.getElementById("timebustAmount");
let timebustAmounts = parseInt(localStorage.getItem("timebustAmount")) || 0;
timebustAmount.textContent = timebustAmounts;

function ShildAmount(){
    if(shieldAmounts <= 0){
        showBanner("🛡️ Shield खत्म है!")
        return;
    }
shildclick = true;
showBanner("🛡️ Shield Activated!");
    
shieldAmounts -= 1;
localStorage.setItem("shieldAmounts", shieldAmounts);
shieldAmount.textContent = shieldAmounts;

}
    
function LifeAmountFun(){
    if(lives < 6 && lifeAmounts > 0){
   alert("Life Powerup is not available in this version. It will be available in the next update.");
   lifeAmounts = lifeAmounts - 1;
localStorage.setItem("lifeAmounts", lifeAmounts);
lifeAmount.textContent = lifeAmounts;
lives += 1;
updateLives();
    }else{
        showBanner("❤️ Life is Full! ");
    }
}
/*
function FireAmount(){
fireAmounts - 1;
localStorage.setItem("fireAmounts", fireAmounts);
fireAmount.textContent = fireAmounts;
}*/
function TimebustAmount() {
if (timebustAmounts > 0) {
 
TimeOutLoop += 20;
TimeOut.innerText = TimeOutLoop;
  
    timebustAmounts -= 1;
    localStorage.setItem("timebustAmount", timebustAmounts);
    
    timebustAmount.textContent = timebustAmounts;

    showBanner("⏰ +20 Seconds!");
} else {
    showBanner("⏰ Time Power खत्म है!");
}
 }

function FireAmount() {
    if (fireAmounts <= 0) {
        showBanner("🔥 Fire Power खत्म है!");
        return;
    }

    const unopenedBubbles = Array.from(
        document.querySelectorAll(".bubbles:not(.opened)")
    );
     const availableBubbles = unopenedBubbles.filter(
        bubble => bubble !== lastClickedBubble
    );
    if (availableBubbles.length === 0) {
        showBanner("🔥 कोई नया Bubble नहीं बचा!");
        return;
    }
    const count = Math.min(4, availableBubbles.length);
    for (let i = availableBubbles.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        
        [availableBubbles[i], availableBubbles[randomIndex]] =
        [availableBubbles[randomIndex], availableBubbles[i]];
    }
    
    const selectedBubbles = availableBubbles.slice(0, count);
    selectedBubbles.forEach(bubble => {
        bubble.click();
    });
    fireAmounts -= 1;
    localStorage.setItem("fireAmounts", fireAmounts);
    fireAmount.textContent = fireAmounts;
    
    showBanner("🔥 Fire! 4 Bubbles Opened!");
}


const LifePower = document.getElementById("lifePower");
const timePower = document.getElementById("timePower"); 
const shieldPower = document.getElementById("shieldPower");
const firePower = document.getElementById("firePower");

LifePower.addEventListener("click", LifeAmountFun);
timePower.addEventListener("click", TimebustAmount); 
shieldPower.addEventListener("click", ShildAmount)
firePower.addEventListener("click", FireAmount);

function updatePowerupUI() {

    lifeAmount.textContent = lifeAmounts;
    fireAmounts.textContent = fireAmount;
    shieldAmounts.textContent = shieldAmount;
    timebustAmounts.textContent = timebustAmount;

}
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
let GetScore = parseInt(localStorage.getItem("bestScore")) || 0;

 if (score > GetScore) {
    localStorage.setItem("bestScore", score);
}
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
const timeBtns = document.querySelectorAll(".time-btn");
let coins =  parseInt(localStorage.getItem("coins")) || 0;

TimeOut.innerText = TimeOutLoop;

timeBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        timeBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        TimeOutLoop = Number(btn.dataset.time);
             
    });
});
function SetCoinAmount(){
let earnedCoins = Math.floor(score / 4);
coins += earnedCoins;
localStorage.setItem("coins", coins);
document.getElementById("finalCoins").innerText = "💸 " + earnedCoins;
}

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
    
}

function BonasScore(count) {
         while (TwoNumberBubblesPositions.length < 13) {
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

    SetCoinAmount();
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
     if(lives === 8){
        livesSpan.innerHTML = "❤️❤️❤️❤️❤️❤️❤️❤️";
    }
    else if(lives === 7){
        livesSpan.innerHTML = "❤️❤️❤️❤️❤️❤️❤️";
    }
    else if(lives === 6){
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
            if (shieldActive) {
               shildclick = false;
               showBanner("🛡️ Shield Protected You!");
            }else{
                lives -= 1;
                updateLives();
                if(bombTarget === 3){
                    showBanner("💣 Bomb Target Reached! Game Over!");
                    resurtTimeout();
                    gameOver = true;
                }
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
        function AllBubblesOpen(){
            const allBubbles = document.querySelectorAll(".bubbles");
            const openedBubbles = document.querySelectorAll(".bubbles.opened");
            if ( allBubbles.length > 0 && openedBubbles.length === allBubbles.length && !gameOver ) 
            {
            gameOver = true; 
            }else
            {
            gameOver = false;
            }
            showBanner("🎉 सभी Bubbles Open हो गए!");
            setTimeout(() => { showResult(); }, 1000);
        }
        
        });
        man.appendChild(bubble);
    }
}

startBtn.addEventListener("click", function () {

    startScreen.style.display = "none";
    game.style.display = "block";
    game.classList.add("show");

    AddLives(100);
    AddBump(100);
    BonasScore(100);

    setNewTarget();
    createBubbles(100);
    startTimer();
});
}
AllFunctionRunning();

