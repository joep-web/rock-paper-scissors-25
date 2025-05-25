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

//other elements
const grayOver = document.querySelector(".gray-overlay")
const nameCont = document.querySelector(".name-cont")

//overlays


/*  start game
    update the myscore text to name + score
*/



// CLICK EVENTS

startGame.addEventListener("click", e => {
    myScore.innerText = `${nameP.value}'s Score: `
    fadeOutEl(grayOver)
    fadeOutEl(nameCont)
})
handsParent.addEventListener("click", e => {
    // lalabas round n pop up
    // scale yung na click na hand always, unscale yung iba pag nag click ng iba
    // may barrier na bababa or 3 hands na umiikot as loading shi
})

shootHand.addEventListener("click", e => {
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