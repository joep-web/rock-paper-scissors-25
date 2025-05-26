// texts 
const myScore = document.getElementById("my-score")
const enemyScore = document.getElementById("en-score")
const roundCount = document.getElementsByClassName("roundsS")
const nameP = document.querySelector("#name-area")

// buttons
const handsParent = document.querySelector(".choices-cont")
const shootHand = document.querySelector("#shoot-hand")
const startGame = document.querySelector("#start")

//display hand cont
const myHandRes = document.querySelector("#hResult")
const enemyHandRes = document.querySelector("#cResult")

//overlays
const grayOver = document.querySelector(".gray-overlay")
const nameCont = document.querySelector(".name-cont")

//nums
const myScoreSpan = document.querySelector("#my-score span");
const enemyScoreSpan = document.querySelector("#en-score span");
const roundNumSpan = document.querySelector(".roundsS span");

let mSNum = Number(myScoreSpan.textContent)
let eSnum = Number(enemyScoreSpan.textContent)
let rNum = Number(roundNumSpan.textContent)

// CLICK EVENTS

startGame.addEventListener("click", e => {
    myScore.innerText = `${nameP.value}'s Score: ${mSNum}`
    fadeOutEl(grayOver)
    fadeOutEl(nameCont)
})

handsParent.addEventListener("click", e => {
    // lalabas round n pop up
    // scale yung na click na hand always, unscale yung iba pag nag click ng iba
    // may barrier na bababa or 3 hands na umiikot as loading shi
})

shootHand.addEventListener("click", e => {
    rNum++
    roundNumSpan.innerText = rNum
    triggerRoundPopup(rNum)
    // may pop up na rock paper scissors shoot tag iisang word bababa or pop up
    // mawawala yung loading dun sa 2 divs
})


// FUNCTIONS

const fadeOutEl = (el) => {
    el.classList.add('fade-out')
    el.addEventListener('animationend', () => {
        el.style.display = 'none'
    })
}

const triggerRoundPopup = (roundNumber) => {
    const popup = document.createElement('div');
    popup.className = 'round-popup';
    popup.textContent = `ROUND ${roundNumber}`;

    document.body.appendChild(popup);

    return new Promise((resolve) => {
        setTimeout(() => {
            popup.classList.add('hide');
            setTimeout(() => {
                popup.remove();
                resolve();
            }, 500); // mag wwait ng .5 sec before iremove sa dom yung pop up
        }, 1800); // mag wwait ng 1.8 sec before ihide yung ppop up
    });
}