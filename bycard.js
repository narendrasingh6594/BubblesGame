const qtyValue = document.getElementById("qtyValue");
const qtyPlus = document.getElementById("qtyPlus");
const qtyMinus = document.getElementById("qtyMinus");

const buyIconSrc = JSON.parse(localStorage.getItem("buyItem"));
let Amounts = [localStorage.getItem("timebustAmount"), localStorage.getItem("fireAmounts"), localStorage.getItem("lifeAmounts"), localStorage.getItem("shieldAmounts")];
let AmountKey = 0;
if(buyIconSrc.icon == "⏰"){
  AmountKey = 0;
}
if(buyIconSrc.icon == "🔥"){
  AmountKey = 1;
}
if(buyIconSrc.icon == "❤️"){
  AmountKey = 2;
}
if(buyIconSrc.icon == "🛡️"){
   AmountKey = 3;
}
console.log(Amounts);
console.log(AmountKey);

const buyNameText = localStorage.getItem("name");
const unitPrice = parseInt(buyIconSrc.price.replace("💸", "").trim())
let quantity = 0;
let TotalBuyItem = 5 - parseInt(Amounts[AmountKey]);
 
function updateTotal() {
    qtyValue.textContent = quantity;
    buyTotal.textContent = " 💸 " + (quantity * unitPrice);
    }
 
qtyPlus.addEventListener("click", () => {
    if (quantity < TotalBuyItem) {
        quantity++;
        updateTotal();
    }
});

qtyMinus.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        updateTotal();
    }
});

 
updateTotal();
    const buyClose = document.getElementById("buyClose");
    buyClose.addEventListener("click", () => {
        window.location.href = "./index.html";
        
    });
    
let timebustAmounts = localStorage.getItem("timebust") || 0;  
let fire = parseInt(localStorage.getItem("fire") || 0);
let life = parseInt(localStorage.getItem("life") || 0);
let shield = parseInt(localStorage.getItem("shield") || 0);

let CoinAmount = parseInt(localStorage.getItem("coins")) || 0;

document.getElementById("buyIcon").innerText = buyIconSrc.icon;
document.getElementById("buyName").innerText = buyIconSrc.name;
//document.getElementById("buyUnitPrice").innerText = buyIconSrc.price + " / item";
 document.getElementById("buyTotal").innerText = "💸 " + (quantity * unitPrice);

function buyItemClick() {
    const coin = parseInt(localStorage.getItem("coins")) || 0;
    const totalPrice = quantity * unitPrice;
    if (coin >= totalPrice) {
        localStorage.setItem("coins", coin - totalPrice);
        Amounts[AmountKey] = parseInt(Amounts[AmountKey]) + quantity;
        localStorage.setItem("timebustAmount", Amounts[0]);
        localStorage.setItem("fireAmounts", Amounts[1]);
        localStorage.setItem("lifeAmounts", Amounts[2]);
        localStorage.setItem("shieldAmounts", Amounts[3]);
        window.location.href = "./index.html";
    } else {
        alert("Not enough coins to buy this item!");
    }
}


let confirmBuyBtn = document.getElementById("confirmBuyBtn");
confirmBuyBtn.addEventListener("click", buyItemClick);