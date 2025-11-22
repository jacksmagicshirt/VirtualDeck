
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
function createDeck() {
    const deckDiv = document.createElement("div");
    deckDiv.className = "deck";

    const cards = createCardDivs();
    const shuffled = shuffleDeck(cards);

    shuffled.forEach((card, index) => {
        // subtle Z stacking visible with deck tilt in CSS
        const depth = index * 1; // px
        card.style.left = "0px";
        card.style.top = "0px";
        card.style.transform = `translateZ(${depth}px)`;
        deckDiv.appendChild(card);
    });

    document.body.appendChild(deckDiv);
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
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
 * Drag Logic (Option B, keep cards as children of body)
 ********************************************/
function startCardDrag(card, e) {
    // If this card was in the hand, remove it from handCards
    if (card.dataset.inHand === "true") {
        removeFromHand(card);
        card.dataset.inHand = "false";
    }

    // If card is inside a deck container, move it to body and preserve absolute position
    if (card.parentElement && card.parentElement.classList.contains("deck")) {
        const startRect = card.getBoundingClientRect();
        document.body.appendChild(card); // move to body
        card.style.left = startRect.left + "px";
        card.style.top = startRect.top + "px";
        // clear transform that might conflict from deck stacking
        card.style.transform = "";
    }

    // prepare offsets
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

        // If dropped inside hand area -> place into hand (visual only, don't change parent)
        if (isInsideHandArea(ev)) {
            addToHand(draggedCard);
        }

        // Clear hovered state
        if (handArea) handArea.classList.remove("hovered");

        // remove listeners and clear state
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
    const HOLD_DELAY = 150; // ms

    card.addEventListener("mousedown", (e) => {
        // Prevent text selection / dragging weirdness
        e.preventDefault();

        // Support left-click only
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

    // Allow keyboard accessibility: Enter/Space to flip when focused (optional)
    card.tabIndex = 0;
    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlers.onTap?.(e);
        }
    });
}

/********************************************
 * Hand area management (Option B: visual-only hand area)
 ********************************************/

// Hover highlight while dragging (keeps existing behavior)
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

/**
 * addToHand(card)
 * - Marks card as "in hand"
 * - Adds to handCards array
 * - Calls layoutHand() to reposition hand visually
 * - Does NOT change DOM parent (card remains under document.body)
 */
function addToHand(card) {
    if (!handArea) return;
    if (card.dataset.inHand === "true") return; // already in hand

    card.dataset.inHand = "true";
    handCards.push(card);
    card.style.zIndex = ++topZIndex;

    layoutHand();
}

/**
 * removeFromHand(card)
 * - Removes card from handCards array and re-layouts
 */
function removeFromHand(card) {
    const idx = handCards.indexOf(card);
    if (idx >= 0) {
        handCards.splice(idx, 1);
        layoutHand();
    }
    card.dataset.inHand = "false";
}

/**
 * layoutHand()
 * - Positions all cards in handCards neatly inside the hand area,
 *   while keeping them children of document.body (so dragging remains consistent).
 */
function layoutHand() {
    if (!handArea) return;
    const rect = handArea.getBoundingClientRect();

    // Hand padding and card spacing
    const cardWidth = 80; // should match .card width in CSS
    const spacing = Math.min(40, Math.max(24, cardWidth * 0.6)); // responsive spacing
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
