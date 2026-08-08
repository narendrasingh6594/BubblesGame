 
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
