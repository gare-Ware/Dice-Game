let player1Score = 0
let player2Score = 0
let player1Turn = true
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const startBtn = document.getElementById("startBtn")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const celebration = document.getElementById("celebration")

function diceImages(playerDice, diceRoll, dbl) {
    if (dbl === 2){
        if (diceRoll === 2){
            playerDice.style.backgroundImage = "url('dice-imgs/1.png')"
        }
        if (diceRoll === 4){
            playerDice.style.backgroundImage = "url('dice-imgs/2.png')"
        }
        if (diceRoll === 6){
            playerDice.style.backgroundImage = "url('dice-imgs/3.png')"
        }
        if (diceRoll === 8){
            playerDice.style.backgroundImage = "url('dice-imgs/4.png')"
        }
        if (diceRoll === 10){
            playerDice.style.backgroundImage = "url('dice-imgs/5.png')"
        }
        if (diceRoll === 12){
            playerDice.style.backgroundImage = "url('dice-imgs/6.png')"
        }
    } else {
        if (diceRoll === 0){
            playerDice.style.backgroundImage = "url('dice-imgs/0.png')"
        }
        if (diceRoll === 1){
            playerDice.style.backgroundImage = "url('dice-imgs/1.png')"
        }
        if (diceRoll === 2){
            playerDice.style.backgroundImage = "url('dice-imgs/2.png')"
        }
        if (diceRoll === 3){
            playerDice.style.backgroundImage = "url('dice-imgs/3.png')"
        }
        if (diceRoll === 4){
            playerDice.style.backgroundImage = "url('dice-imgs/4.png')"
        }
        if (diceRoll === 5){
            playerDice.style.backgroundImage = "url('dice-imgs/5.png')"
        }
        if (diceRoll === 6){
            playerDice.style.backgroundImage = "url('dice-imgs/6.png')"
        }
    }
}

function showGameButtons() {
    startBtn.style.display = "none"
    rollBtn.style.display = "block"
    riskBtn.style.display = "block"
}

function showResetButton() {
    startBtn.style.display = "none"
    rollBtn.style.display = "none"
    riskBtn.style.display = "none"
    resetBtn.style.display = "block"
}

function switchFromPlayer1() {
    player1Dice.classList.remove("active")
    player2Dice.classList.add("active")
    player1.classList.remove("activePlayer")
    player1.classList.remove("dbl")
    player1.classList.remove("nothing")
    player2.classList.add("activePlayer")
    player2Dice.classList.remove("bounce")
    player1Dice.classList.remove("initialBounce")
    player1.classList.remove("scale")
}

function switchFromPlayer2() {
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
    player2.classList.remove("activePlayer")
    player2.classList.remove("dbl")
    player2.classList.remove("nothing")
    player1.classList.add("activePlayer")
    player1Dice.classList.remove("bounce")
    player2Dice.classList.remove("initialBounce")
    player2.classList.remove("scale")
}

function rollDice(number, dbl) {
    if (player1Turn) {
        player1Score += number
        player1Scoreboard.textContent = player1Score
        diceImages(player1Dice, number, dbl)
        player1Dice.classList.add("bounce")
        if (player1Score < 20) {
            setTimeout(switchFromPlayer1, 400)
        }
    } else {
        player2Score += number
        player2Scoreboard.textContent = player2Score
        diceImages(player2Dice, number, dbl)
        player2Dice.classList.add("bounce")
        if (player2Score < 20) {
            setTimeout(switchFromPlayer2, 400)
        }
    }

    if (player1Score >= 20) {
        message.textContent = "P1 WINS 🥳"
        showResetButton()
        celebration.style.display = "block"
    }  else if (player2Score >= 20) {
        message.textContent = "P2 WINS 🎉"
        showResetButton()
        celebration.style.display = "block"
    }
    player1Turn = !player1Turn
}

diceImages(player1Dice, 0)
diceImages(player2Dice, 0)

startBtn.addEventListener("click", function(){
    const randomNumber1 = Math.floor(Math.random() * 6) + 1
    const randomNumber2 = Math.floor(Math.random() * 6) + 1
    player1Score += randomNumber1
    player2Score += randomNumber2
    player1Scoreboard.textContent = player1Score
    player2Scoreboard.textContent = player2Score
    diceImages(player1Dice, randomNumber1)
    diceImages(player2Dice, randomNumber2)
    player1Dice.classList.add("initialBounce")
    player2Dice.classList.add("initialBounce")
    if (player1Score > player2Score) {
        player2Dice.classList.remove("active")
        player1.classList.add("activePlayer")
        player1.classList.add("scale")
        showGameButtons()
    } else if (player1Score === player2Score) {
        message.textContent = "TIE."
        showResetButton()
    } else {
        player1Dice.classList.remove("active")
        player2.classList.add("activePlayer")
        player2.classList.add("scale")
        showGameButtons()
        player1Turn = !player1Turn
    }
})

rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1
    rollDice(randomNumber)
})
 
riskBtn.addEventListener("click", function(){
    let randomNumber = Math.floor(Math.random() * 6) + 1
    const dblOrNothing = Math.floor(Math.random() * 2) + 1
    if (dblOrNothing === 2) {
        randomNumber *= 2
        if (player1Turn) {
            player1.classList.add("dbl")
        } else {
            player2.classList.add("dbl")
        }
    } else {
        randomNumber *= 0
        if (player1Turn) {
            player1.classList.add("nothing")
        } else {
            player2.classList.add("nothing")
        }
    }
    rollDice(randomNumber, dblOrNothing)
})

resetBtn.addEventListener("click", function(){
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    diceImages(player1Dice, 0)
    diceImages(player2Dice, 0)
    message.textContent = "DICE GAME"
    resetBtn.style.display = "none"
    startBtn.style.display = "block"
    player2Dice.classList.remove("bounce")
    player1Dice.classList.remove("bounce")
    player2Dice.classList.add("active")
    player1Dice.classList.add("active")
    player2.classList.remove("activePlayer")
    player1.classList.remove("activePlayer")
    player2.classList.remove("dbl")
    player1.classList.remove("dbl")
    player1Dice.classList.remove("initialBounce")
    player2Dice.classList.remove("initialBounce")
    celebration.style.display = "none"
})
