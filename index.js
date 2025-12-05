/********************************************
 * index.js - main game logic (drag, deck, hand area)
 ********************************************/

/********************************************
 * Card Metadata
 ********************************************/
const rankMap = {
    "2": "2","3": "3","4": "4","5": "5","6": "6","7": "7","8": "8","9": "9",
    "T": "10","J": "jack","Q": "queen","K": "king","A": "ace"
};
const suitMap = {"H": "hearts","D": "diamonds","C": "clubs","S": "spades"};
const suits = ["H", "D", "C", "S"];
const ranks = ["2","3","4","5","6","7","8","9","T","J","Q","K","A"];

let topZIndex = 10000;

/********************************************
 * Runtime state
 ********************************************/
const handArea = document.getElementById("handArea");
let handCards = [];            // array of cards currently "in" the hand (visual only)
let draggedCard = null;        // currently dragging card
let currentOffset = { x: 0, y: 0 };

/********************************************
 * Input Helpers (merged from KeyPressListener.js)
 ********************************************/

class KeyPressListener {
    constructor(key, callback) {
        this.key = key;
        this.callback = callback;

        this.keydownFn = (e) => {
            if (e.key === this.key) {
                this.callback(e);
            }
        };

        document.addEventListener("keydown", this.keydownFn);
    }

    unbind() {
        document.removeEventListener("keydown", this.keydownFn);
    }
}

function onHold(element, holdTime, onHoldStart, onClick) {
    let timer = null;

    element.addEventListener("mousedown", (e) => {
        timer = setTimeout(() => onHoldStart(e), holdTime);
    });

    element.addEventListener("mouseup", (e) => {
        clearTimeout(timer);
        onClick(e);
    });
}

/********************************************
 * Create 52 card divs
 ********************************************/
function createCardDivs() {
    let cardDivs = [];

    for (let s = 0; s < suits.length; s++) {
        for (let r = 0; r < ranks.length; r++) {
            const rank = ranks[r];
            const suit = suits[s];
            const imgRank = rankMap[rank];
            const imgSuit = suitMap[suit];

            const card = document.createElement("div");
            card.className = `card face-down ${rank}${suit}`;
            card.dataset.face = "down";
            card.dataset.front = `img/standard-deck/${imgRank}_of_${imgSuit}.png`;
            card.dataset.inHand = "false";

            // Start face-down
            card.style.backgroundImage = `url("img/standard-deck/back.png")`;

            // Add interaction
            addCardInput(card, {
                onTap: () => flipCard(card),
                onHoldStart: (e) => startCardDrag(card, e)
            });

            cardDivs.push(card);
        }
    }
    return cardDivs;
}

/********************************************
 * Deck Creation
 ********************************************/

function renderDeck(deckDiv, cards) {
    deckDiv.innerHTML = ''; 

    cards.forEach((card, index) => {
        const depth = index * 1; 
        card.style.left = "0px";
        card.style.top = "0px";
        card.style.transform = `translateZ(${depth}px)`;
        deckDiv.appendChild(card);
    });

    document.body.appendChild(deckDiv);
}

function createDeck() {
    const deckDiv = document.createElement("div");
    deckDiv.className = "deck";

    const cards = createCardDivs();
    const shuffled = shuffleDeckArray(cards);
    renderDeck(deckDiv, shuffled);
}

/********************************************
 * Shuffle the deck 
 ********************************************/
const shuffleButton = document.getElementById("btn-shuffle");
shuffleButton.addEventListener('click', shuffleDeck);

function shuffleDeckArray(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

function shuffleDeck() {
    const deckDiv = document.querySelector(".deck");
    const cards = Array.from(deckDiv.children);
    shuffleDeckArray(cards);
    renderDeck(deckDiv, cards);
}

/********************************************
 * Flip Logic
 ********************************************/
function flipCard(card) {
    if (card.dataset.face === "down") {
        card.dataset.face = "up";
        card.classList.remove("face-down");
        card.style.backgroundImage = `url("${card.dataset.front}")`;
    } else {
        card.dataset.face = "down";
        card.classList.add("face-down");
        card.style.backgroundImage = `url("img/standard-deck/back.png")`;
    }
}

/********************************************
 * Drag Logic
 ********************************************/
function startCardDrag(card, e) {
    if (card.dataset.inHand === "true") {
        removeFromHand(card);
        card.dataset.inHand = "false";
    }

    if (card.parentElement && card.parentElement.classList.contains("deck")) {
        const startRect = card.getBoundingClientRect();
        document.body.appendChild(card);
        card.style.left = startRect.left + "px";
        card.style.top = startRect.top + "px";
        card.style.transform = "";
    }

    const rect = card.getBoundingClientRect();
    currentOffset.x = e.clientX - rect.left;
    currentOffset.y = e.clientY - rect.top;

    draggedCard = card;
    card.style.zIndex = ++topZIndex;
    card.classList.add("dragging");

    function move(ev) {
        if (!draggedCard) return;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const cardWidth = draggedCard.offsetWidth;
        const cardHeight = draggedCard.offsetHeight;

        let newX = ev.clientX - currentOffset.x;
        let newY = ev.clientY - currentOffset.y;

        newX = Math.max(0, Math.min(newX, viewportWidth - cardWidth));
        newY = Math.max(0, Math.min(newY, viewportHeight - cardHeight));

        draggedCard.style.left = newX + "px";
        draggedCard.style.top = newY + "px";
    }

    function stop(ev) {
        if (!draggedCard) return;

        draggedCard.classList.remove("dragging");

        if (isInsideHandArea(ev)) {
            addToHand(draggedCard);
        }

        if (handArea) handArea.classList.remove("hovered");

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", stop);
        draggedCard = null;
    }

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
}

/********************************************
 * Tap vs Hold Input Handler
 ********************************************/
function addCardInput(card, handlers) {
    let holdTimer = null;
    let isHold = false;
    const HOLD_DELAY = 150;

    card.addEventListener("mousedown", (e) => {
        e.preventDefault();
        holdTimer = setTimeout(() => {
            isHold = true;
            handlers.onHoldStart?.(e);
        }, HOLD_DELAY);
    });

    card.addEventListener("mouseup", (e) => {
        clearTimeout(holdTimer);
        if (!isHold) {
            handlers.onTap?.(e);
        }
        isHold = false;
    });

    card.tabIndex = 0;
    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlers.onTap?.(e);
        }
    });
}

/********************************************
 * Hand area management 
 ********************************************/

if (handArea) {
    document.addEventListener("mousemove", (e) => {
        const rect = handArea.getBoundingClientRect();
        const inside =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

        if (inside) {
            handArea.classList.add("hovered");
        } else {
            handArea.classList.remove("hovered");
        }
    });
}

function isInsideHandArea(ev) {
    if (!handArea) return false;
    const rect = handArea.getBoundingClientRect();
    return (
        ev.clientX >= rect.left &&
        ev.clientX <= rect.right &&
        ev.clientY >= rect.top &&
        ev.clientY <= rect.bottom
    );
}

function addToHand(card) {
    if (!handArea) return;
    if (card.dataset.inHand === "true") return;

    card.dataset.inHand = "true";
    handCards.push(card);
    card.style.zIndex = ++topZIndex;

    layoutHand();
}

function removeFromHand(card) {
    const idx = handCards.indexOf(card);
    if (idx >= 0) {
        handCards.splice(idx, 1);
        layoutHand();
    }
    card.dataset.inHand = "false";
}

function layoutHand() {
    if (!handArea) return;
    const rect = handArea.getBoundingClientRect();

    const cardWidth = 80;
    const spacing = Math.min(40, Math.max(24, cardWidth * 0.6));
    const totalWidth = spacing * (handCards.length - 1) + cardWidth;
    const startX = rect.left + Math.max(12, (rect.width - totalWidth) / 2);
    const y = rect.top + Math.max(8, (rect.height - parseInt(getComputedStyle(document.documentElement).fontSize, 10)) / 4);

    handCards.forEach((card, i) => {
        const x = startX + i * spacing;
        card.style.left = Math.round(x) + "px";
        card.style.top = Math.round(y) + "px";
        card.style.zIndex = ++topZIndex;
    });
}

/********************************************
 * Initialize
 ********************************************/
createDeck();
