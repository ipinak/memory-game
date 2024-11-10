const uniqueEmojis = ['🍎', '🍌', '🍉', '🍇', '🍓', '🍒', '🍍', '🥭', '🍑', '🥝', '🍋', '🍐', '🥑', '🍔', '🍕', '🍟', '🌭', '🍿'];
const cardsArray = [...uniqueEmojis, ...uniqueEmojis];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;
let gameEnded = false;

function shuffleCards(array) {
    array.sort(() => 0.5 - Math.random());
}

function setupBoard() {
    const memoryBoard = document.getElementById("memoryBoard");
    memoryBoard.innerHTML = '';
    matches = 0;
    shuffleCards(cardsArray);

    cardsArray.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.innerText = "?";
        card.addEventListener("click", flipCard);
        memoryBoard.appendChild(card);
    });
    removeEndMessage();
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add("flipped");
    this.innerText = this.dataset.symbol;

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
    checkForGameEnd();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
    isMatch ? disableCards() : unflipCards();
}

function checkForGameEnd() {
    gameEnded = matches === cardsArray.length / 2;
    if (gameEnded) {
        setEndMessage('Game finished!');
    }
}

function setEndMessage(msg) {
    const elem = document.getElementById("gameEndedMessage");
    elem.classList.add("game-ended");
    elem.innerText = msg;
}

function removeEndMessage() {
    const elem = document.getElementById("gameEndedMessage");
    elem.classList.remove("game-ended");
    elem.innerText = '';
}

function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
    matches++;
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.innerText = "?";
        secondCard.innerText = "?";
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    setupBoard();
}

/* Help Popup Functions */
function openPopup(id) {
    document.getElementById(id).style.display = "flex";
}

function closePopup(id) {
    document.getElementById(id).style.display = "none";
}

document.addEventListener("DOMContentLoaded", setupBoard);

window.onload = () => {
    const emoji = ['❤️', '☕️', '🍕', '🍎', '🍌', '🍗', '🥗'].sort(() => 0.4 - Math.random())[0];
    const msg = `Built with <span class="heart">${emoji}</span> by <a class="techpals-link" href='https://techpals.eu?src=mem-game'>TechPals</a>`;
    console.log(msg);
    document.getElementById("bwm").innerHTML = msg;
};
