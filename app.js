
function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

//random color generator
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//random name generator
function getRandomName() {
    var adjectives = ["Swift", "Brave", "Clever", "Mighty", "Fierce", "Nimble", "Wise", "Bold"];
    var animals = ["Lion", "Tiger", "Eagle", "Shark", "Wolf", "Falcon", "Panther", "Bear"];
    return randomFromArray(adjectives) + " " + randomFromArray(animals);
}


( function() {

    let playerId;
    let playerRef;
    let playerElements = {};

    const gameContainer = document.querySelector('.game-container');

    function initGame() {
        const allPlayersRef = firebase.database().ref('players');

        allPlayersRef.on('value', (snapshot) => {
            //fires when a change occurs
        });
        allPlayersRef.on('child_added', (snapshot) => {
            const addedPlayer = snapshot.val();
            const characterElement = document.createElement('div');
            //characterElement.classList.add("Character",)
            if (addedPlayer.id === playerId) {
                characterElement.classList.add("You");
            }

            //TODO: set div attributes for each card
            characterElement.innerHTML = ('');
            playerElements[addedPlayer.id] = characterElement;

            //fill in some initial state
            characterElement.querySelector('.Character_name').innerText = addedPlayer.name;
            characterElement.setAttribute("data-color", addedPlayer.color);

            console.log('New player joined: ', newPlayer);
        });
    }

    firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
            //Logged in
            playerId = user.uid;
            playerRef = firebase.database().ref('players/${playerId}');

            playerRef.set({
                id: playerId,
                name: getRandomName(),
                color: getRandomColor(),
            })

            playerRef.onDisconnect().remove();

            initGame();

        } else {
            //Logged out
        }
    })

    firebase.auth().signInAnonymously()

})();