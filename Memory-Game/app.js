const cards = document.querySelectorAll('.memory-card');

let flipValue = false;
let lockBoard = false;
let card1, card2;


function flipCard() {
    if (lockBoard) return;
    if (this === card1) return;
    this.classList.toggle('flip');

    if(!flipValue) {
        flipValue = true;
        card1 = this;
        return;
    }
    else {
        flipValue = false;
        card2 = this;
    }

    checkforMatch();
}

function checkforMatch () {
    if(card1.dataset.framework === card2.dataset.framework) {
        disableCards();
    }
    else {
        unflipCards();
    }
}

function disableCards() {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');

        lockBoard = false;
        resetBoard();
    }, 900);
    
}

function resetBoard() {
    [flipValue, lockBoard] = [false, false];
    [card1, card2] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*8)
        card.style.order = randomPos
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard))