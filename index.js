var suits = ["H", "D", "C", "S"];
var ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];


// create a div object for each card in a standard 52-card deck and return as an array
function createCardDivs() {
    var cardDivs = [];  
    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < ranks.length; j++) {
            var card = document.createElement("div");
            card.className = "card " + ranks[j] + suits[i];
            cardDivs.push(card);
        }
    }   
    return cardDivs;
}

function createDeck() {
    var deck = [];
    deckdiv = document.createElement("div");
    deckdiv.className = "deck";
    var cardDivs = createCardDivs();
    for (var i = 0; i < cardDivs.length; i++) {
        deck.push(cardDivs[i]);
    }
    //shuffle the deck
    var shuffled = shuffleDeck(deck);
    for (var i = 0; i < shuffled.length; i++) {
        deckdiv.appendChild(shuffled[i]);
    }
    document.body.appendChild(deckdiv);
    return shuffled;
}

function shuffleDeck(deck) {
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
}


createDeck();

//TODO: decide if we want to keep this function
/*
function dealCards(deck, numberOfPlayers, cardsPerPlayer) {
    var hands = [];
    for (var i = 0; i < numberOfPlayers; i++) {
        hands[i] = [];
        for (var j = 0; j < cardsPerPlayer; j++) {
            hands[i].push(deck.pop());
        }
    }
    return hands;
}
*/
