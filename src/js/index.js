// Elements
const myScore = document.getElementById("my-score")
const enemyScore = document.getElementById("en-score")
const roundCount = document.getElementsByClassName("roundsS")
const nameP = document.querySelector("#name-area")

// Buttons
const handsParent = document.querySelector(".choices-cont > div")
const shootHand = document.querySelector("#shoot-hand")
const startGame = document.querySelector("#start")

// Display containers
const myHandRes = document.querySelector("#hResult")
const enemyHandRes = document.querySelector("#cResult")

// Overlays
const grayOver = document.querySelector(".gray-overlay")
const nameCont = document.querySelector(".name-cont")

// Score elements
const enemyScoreSpan = document.querySelector("#en-score span")
const roundNumSpan = document.querySelector(".roundsS span")

const playerNameSpan = document.createElement('span')
const myScoreSpan = document.createElement('span')

playerNameSpan.id = "player-name"
myScoreSpan.id = "score-value"

myScore.innerHTML = '' 
myScore.appendChild(playerNameSpan)
myScore.appendChild(document.createTextNode("'s Score: "))
myScore.appendChild(myScoreSpan)


// Score values
let mSNum = 0
let eSnum = Number(enemyScoreSpan.textContent)
let rNum = Number(roundNumSpan.textContent)

let finishedLoading = true
let clickedChoices = false

const choicesArr = []
const idChoice = {
    "r": "Rock",
    "p": "Paper",
    "s": "Scissors"
}

// Event Listeners
startGame.addEventListener("click", e => {
    if(nameP.value === "") {
        requireName()
        return
    }
    playerNameSpan.textContent = nameP.value
    myScoreSpan.textContent = mSNum
    fadeOutEl(grayOver)
    fadeOutEl(nameCont)
})

nameP.addEventListener("focus", () => {
    nameP.style.border = "1px  #73877b solid"
})

handsParent.addEventListener("click", e => {
    const choice = e.target
    const imgL = enemyHandRes.querySelector("img")
    
    if(/^(r|p|s)/.test(choice.id)) {
        scaleChoices(choice)
        
        for(const h of handsParent.children) {
            if(h.id !== choice.id) scaleDown(h)
        }

        if(imgL && !imgL.classList.contains("loading-img")) {
            imgL.remove()
            showEnemyLoading()
        } 

        clickedChoices = true

        if (!imgL) showEnemyLoading()

        displayChoice(choice.id, "#hResult")
        choicesArr.push(choice.id)
    }
})

shootHand.addEventListener("click", async e => {
    if (!finishedLoading) return
    if (!clickedChoices) {
        showSlideMessage()
        return
    }

    finishedLoading = false
    shootHand.disabled = true
    rNum++
    roundNumSpan.innerText = rNum
    
    await triggerRoundPopup(rNum)
    await Promise.all ([
        triggerRPS("Rock", 500),
        triggerRPS("Paper", 1000),
        triggerRPS("Scissors", 1500),
        triggerRPS("Shoot", 2000)
    ])

    getComputerChoice()
    finishedLoading = true
    shootHand.disabled = false

})

// Helper Functions

 let messageTimeout;

const showSlideMessage = () => {
    const message = document.getElementById('slideMessage');
        
    if (messageTimeout) {
        clearTimeout(messageTimeout);
    }
    
    message.classList.add('show');
    
    messageTimeout = setTimeout(() => {
        message.classList.remove('show');
    }, 1500);
}


const requireName = () => {
    nameP.style.border = "2px red solid"
}

const scaleAndColorWinner = (winResult) => {
    const animationDuration = 500;
    const winnerScale = 1.2;
    const winnerColor = "#4CD964";
    const defaultColor = "#F7FFF7";
    
    myScore.style.transition = `all ${animationDuration}ms ease`;
    enemyScore.style.transition = `all ${animationDuration}ms ease`;
    
    if (winResult === "cWin") {
        enemyScore.style.transform = `scale(${winnerScale})`;
        enemyScore.style.color = winnerColor;
    } else if (winResult === "hWin") {
        myScore.style.transform = `scale(${winnerScale})`;
        myScore.style.color = winnerColor;
    } else {
        myScore.style.color = "#FFD700";
        enemyScore.style.color = "#FFD700";
    }
    
    setTimeout(() => {
        myScore.style.transform = "scale(1)";
        enemyScore.style.transform = "scale(1)";
        myScore.style.color = defaultColor;
        enemyScore.style.color = defaultColor;
    }, 1500); 
};

const scaleChoices = c => {
    c.style.transform = "scale(1.1)"
    c.style.transition = "all .3s"
}

const scaleDown = c => {
    c.style.transform = "scale(1.0)"
    c.style.transition = "all .3s"
}

const fadeOutEl = el => {
    el.classList.add('fade-out')
    el.addEventListener('animationend', () => {
        el.style.display = 'none'
    })
}

const triggerRoundPopup = roundNumber => {
    const popup = document.createElement('div')
    popup.className = 'round-popup'
    popup.textContent = `ROUND ${roundNumber}`
    
    document.body.appendChild(popup)
    
    return new Promise(resolve => {
        setTimeout(() => {
            popup.classList.add('hide')
            
            setTimeout(() => {
                popup.remove()
                resolve()
            }, 500)
        }, 1000)        
    })
}

const triggerRPS = (RPC, time) => {
    const popup = document.createElement('div')
    popup.textContent = RPC === "Shoot"?"Shoot !!": RPC

    
    setTimeout(() => {
        document.body.appendChild(popup)
        popup.className = `round-popup ${RPC}`
    }, time)
    
    return new Promise(resolve => {
        const hideTime = RPC === "Scissors" ? time + 1050 : time + 2000
        setTimeout(() => {
            popup.classList.add('hide')

            setTimeout(() => {
                popup.remove()
                resolve()
            }, 500)
        }, hideTime)
    })
}

const showEnemyLoading = (loadingImgSrc = 'src/icons/ui/phi revolution.png') => {
    const enemyHandRes = document.querySelector("#cResult")
    const originalContent = enemyHandRes.querySelector('p')
    
    if (originalContent) {
        enemyHandRes.dataset.originalText = originalContent.textContent
        originalContent.remove()
    }
    
    const loadingImg = document.createElement('img')
    loadingImg.src = loadingImgSrc
    loadingImg.className = 'loading-img fade-in'
    loadingImg.alt = 'Loading...'
    
    enemyHandRes.appendChild(loadingImg)
    enemyHandRes.classList.add('loading')
    
    return loadingImg
}


const displayChoice = (choice, cont ) => {
    const handCont = document.querySelector(cont)
    const choiceObj = {
        "r": "src/icons/ui/rock.svg",
        "p": "src/icons/ui/paper.svg",
        "s": "src/icons/ui/scissors.svg"
    }

    const existingText = handCont.querySelector("p")
    if (existingText) existingText.remove()

    let userHand = handCont.querySelector("img")
    
    if (userHand) {
        userHand.src = choiceObj[choice]
        userHand.className = "fade-in img-res"
    } else {
        userHand = document.createElement("img")
        userHand.src = choiceObj[choice]
        userHand.className = "fade-in img-res"
        userHand.alt = "User hand choice"
        handCont.appendChild(userHand)
    }
}


const getComputerChoice = () => {
    const r = Math.floor(Math.random() * 3)
    let comResult
    
    if (r === 0) {
        comResult = "r"
        displayChoice("r", "#cResult")
    } else if (r === 1) {
        comResult = "p"
        displayChoice("p", "#cResult")
    } else {
        comResult = "s"
        displayChoice("s", "#cResult")
    }

    Winner(comResult)
}

const Winner = r => {
    const winConditions = {
        "r": "s",
        "p": "r",
        "s": "p"
    }

    const enemyChoice = r
    const userChoice = choicesArr[choicesArr.length - 1]

    if(enemyChoice === userChoice) {
        scaleAndColorWinner("tie")
        myScoreSpan.innerText = ++mSNum
        enemyScoreSpan.innerText = ++eSnum
    } else if ( winConditions[r] === userChoice) {
        enemyScoreSpan.innerText = ++eSnum
        scaleAndColorWinner("cWin")
    } else {
        myScoreSpan.innerText = ++mSNum
        scaleAndColorWinner("hWin")
    }

    for(const h of handsParent.children) {
        scaleDown(h)
    }

    clickedChoices = false
}

console.log("bat iba")

