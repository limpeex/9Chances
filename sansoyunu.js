const startButton = document.querySelector("#startButton");
const endButton = document.querySelector("#endButton");
const currentCurrencySpan = document.querySelector("#currentCurrency");
let betValueSpan = document.querySelector("#betValue");
let canStart = true;
const buttonList = new Array();
let currentCurrencyInt = parseInt(currentCurrencySpan.innerText);
let currentCurrency = currentCurrencyInt;
let tries = 1;
let hasEnded = false;


for (let i = 0; i < 9; i++) {
    buttonList[i] = document.querySelector(`#button${i + 1}`);
}

const arrayCopy = [...buttonList];

for (let i = 0; i < 9; i++) {
    buttonList[i].addEventListener("click", clickToButton);
}


function randomIndex(array) {
    for (let i = buttonList.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = arrayCopy[i];
        arrayCopy[i] = arrayCopy[j];
        arrayCopy[j] = k;
    }
    for (let i = 0; i < 3; i++) {
        array[i] = arrayCopy[i];
    }
    return array;
}

function clickToButton() {
    if (canStart == false) {
        hasEnded = false;
        if (!hasEnded) {

            let ownsIt = false;
            let array = [...randomIndex([])];
            for (let i = 0; i < array.length; i++) {
                if (this.id == array[i].id) ownsIt = true;
            }


            if (ownsIt) {
                this.style.backgroundColor = 'red'
                hasEnded = true;
                canStart = true;
            }
            else this.style.backgroundColor = 'green';


            if (tries === 9) {
                hasEnded = true;
            }
            else tries++;

        }
    }
}


function clear() {
    for (let i = 0; i < buttonList.length; i++) {
        buttonList[i].style.backgroundColor = "initial";
    }
    betValue.value = "";
}

startButton.addEventListener("click", () => {

    if (canStart) {
        betValueSpanInt = parseInt(betValue.value);
        if (currentCurrency >= betValueSpanInt) {
            betValueSpanInt = parseInt(betValue.value);
            canStart = false;
            currentCurrency -= betValueSpanInt;
            currentCurrencySpan.innerText = `${currentCurrency}`
            clear();
            alert("You have started to the game!");
        } else {
            alert("Your currency is not enough");
        }

    } else {
        alert("Game is already being played!");
    }
});


endButton.addEventListener("click", () => {
    if (!canStart) {
        hasEnded = true;
        let num = 0;
        for (let i = 0; i < buttonList.length; i++) {
            if (buttonList[i].style.backgroundColor == "green")
                num++;
        }
        currentCurrency = currentCurrency + betValueSpanInt + (num * (betValueSpanInt * 1.2));
        currentCurrencySpan.innerText = currentCurrency;
        canStart = true;
        clear();
    } else {
        console.log("Game has not started yet...")
    }
});



