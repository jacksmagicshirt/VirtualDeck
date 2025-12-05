/* app.js - Multiplayer (Firebase) for the card deck simulator
   Drop into your project (after index.js). */

(function () {
  // --------- Configuration ----------
  const ROOM_CODE_LENGTH = 6; // alphanumeric
  const ROOM_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // Firebase root refs (will be initialized after auth & room join)
  let roomCode = null;
  let roomRef = null;
  let deckRef = null;
  let playersRef = null;

  // Player info
  let playerId = null;
  let playerName = null;
  let playerColor = null;

  // Local caches
  const playerElements = {}; // playerId -> DOM element in player list
  const cardElements = {}; // cardId -> DOM element (cached)
  let connectedToRoom = false;

  // small helper: pick a random thing (we re-use your helpers if present)
  function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function getRandomName() {
    var adjectives = ["Swift", "Brave", "Clever", "Mighty", "Fierce", "Nimble", "Wise", "Bold"];
    var animals = ["Lion", "Tiger", "Eagle", "Shark", "Wolf", "Falcon", "Panther", "Bear"];
    return randomFromArray(adjectives) + " " + randomFromArray(animals);
  }

  // ---------- UI Helpers ----------
  function injectStyles() {
    const css = `
/* Multiplayer modal & player list */
.md-overlay { position:fixed; inset:0; background: rgba(0,0,0,0.45); display:flex; align-items:center; justify-content:center; z-index:100000; }
.md { background:white; border-radius:10px; padding:20px; min-width:320px; box-shadow:0 8px 30px rgba(0,0,0,0.35); }
.md h3 { margin:0 0 12px 0; font-size:18px; }
.md .row { display:flex; gap:8px; margin-top:12px; }
.btn { background:#2d2d2d; color:white; border:none; padding:10px 14px; border-radius:6px; cursor:pointer; }
.btn.secondary { background:#eee; color:#222; border:1px solid #ccc; }
.input { width:100%; padding:10px; border-radius:6px; border:1px solid #ccc; font-size:16px; box-sizing:border-box; }
.header-room { position: absolute; right: 16px; top: 8px; background: rgba(255,255,255,0.06); color: #fff; padding:6px 10px; border-radius:6px; font-weight:600; z-index:99999; box-shadow: 0 2px 10px rgba(0,0,0,0.25); }
.player-list { position: fixed; left: 12px; bottom: 210px; width: 180px; background: rgba(255,255,255,0.03); border-radius:8px; padding:10px; box-shadow:0 6px 20px rgba(0,0,0,0.25); z-index:99998; color: #111; backdrop-filter: blur(6px); }
.player-item { display:flex; align-items:center; gap:8px; margin-bottom:8px; padding:6px; border-radius:6px; background: rgba(255,255,255,0.02); }
.player-badge { width:14px; height:14px; border-radius:3px; border:2px solid rgba(255,255,255,0.9); box-sizing:border-box; }
.player-name { font-size:13px; font-weight:700; color:#222; }
.player-count { margin-left:auto; font-weight:700; background: rgba(0,0,0,0.05); padding:4px 8px; border-radius:6px; font-size:12px; color:#222; }
.card.grabbed-outline { box-shadow: 0 0 0 4px rgba(0,0,0,0.06), 0 0 0 6px var(--grab-color, rgba(255,0,0,0.35)); transition: box-shadow 0.06s ease; }
.header-bar .roomcode { position: absolute; right: 12px; top: 8px; color: white; font-weight:700; background: rgba(0,0,0,0.25); padding:6px 10px; border-radius:6px; }
`;
    const s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  function createModal(contentEl) {
    const overlay = document.createElement('div');
    overlay.className = 'md-overlay';
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
    const md = document.createElement('div');
    md.className = 'md';
    md.appendChild(contentEl);
    overlay.appendChild(md);
    document.body.appendChild(overlay);
    return { overlay, md };
  }

  function showMainMultiplayerModal() {
    const content = document.createElement('div');

    const h = document.createElement('h3');
    h.innerText = 'Multiplayer';
    content.appendChild(h);

    const btnRow = document.createElement('div');
    btnRow.className = 'row';
    const createBtn = document.createElement('button');
    createBtn.className = 'btn';
    createBtn.innerText = 'Create Room';
    const joinBtn = document.createElement('button');
    joinBtn.className = 'btn secondary';
    joinBtn.innerText = 'Join Room';
    btnRow.appendChild(createBtn);
    btnRow.appendChild(joinBtn);
    content.appendChild(btnRow);

    const { overlay } = createModal(content);

    createBtn.addEventListener('click', () => {
      overlay.remove();
      createRoomFlow();
    });
    joinBtn.addEventListener('click', () => {
      overlay.remove();
      showJoinModal();
    });
  }

  function showJoinModal() {
    const content = document.createElement('div');
    const h = document.createElement('h3');
    h.innerText = 'Join Room';
    content.appendChild(h);

    const input = document.createElement('input');
    input.placeholder = 'Enter room code';
    input.className = 'input';
    input.maxLength = 12;
    content.appendChild(input);

    const row = document.createElement('div');
    row.className = 'row';
    const joinBtn = document.createElement('button');
    joinBtn.className = 'btn';
    joinBtn.innerText = 'Join';
    row.appendChild(joinBtn);
    content.appendChild(row);

    const { overlay } = createModal(content);

    joinBtn.addEventListener('click', async () => {
      const code = input.value.trim().toUpperCase();
      if (!code) return;
      overlay.remove();
      await joinRoom(code);
    });
  }

  // attach Multiplayer button handler (existing button id: btn-multiplayer)
  function attachMultiplayerButton() {
    const mpBtn = document.getElementById('btn-multiplayer');
    if (!mpBtn) return;
    mpBtn.addEventListener('click', () => {
      showMainMultiplayerModal();
    });
  }

  // header room code display
  function setRoomCodeBanner(code) {
    let el = document.querySelector('.header-bar .roomcode');
    if (!el) {
      el = document.createElement('div');
      el.className = 'roomcode';
      const header = document.querySelector('.header-bar') || document.body;
      header.appendChild(el);
    }
    el.innerText = code ? `Room: ${code}` : '';
  }

  // player list UI
  function ensurePlayerList() {
    if (document.querySelector('.player-list')) return;
    const pl = document.createElement('div');
    pl.className = 'player-list';
    pl.innerHTML = `<div style="font-weight:800; margin-bottom:8px;">Players</div>`;
    document.body.appendChild(pl);
  }
  function clearPlayerListUI() {
    const pl = document.querySelector('.player-list');
    if (pl) pl.querySelectorAll('.player-item').forEach(n => n.remove());
  }
  function renderOrUpdatePlayerUI(pId, info) {
    ensurePlayerList();
    const pl = document.querySelector('.player-list');
    let item = playerElements[pId];
    if (!item) {
      item = document.createElement('div');
      item.className = 'player-item';
      const badge = document.createElement('div');
      badge.className = 'player-badge';
      const nameEl = document.createElement('div');
      nameEl.className = 'player-name';
      const countEl = document.createElement('div');
      countEl.className = 'player-count';
      item.appendChild(badge);
      item.appendChild(nameEl);
      item.appendChild(countEl);
      pl.appendChild(item);
      playerElements[pId] = item;
    }
    const badge = item.querySelector('.player-badge');
    const nameEl = item.querySelector('.player-name');
    const countEl = item.querySelector('.player-count');

    badge.style.background = info.color || '#999';
    nameEl.innerText = (info.id === playerId) ? (info.name + ' (You)') : info.name;
    countEl.innerText = (info.handCount != null) ? info.handCount : '0';
  }

  // ---------- Room Code ----------
  function makeRoomCode(len = ROOM_CODE_LENGTH) {
    let out = '';
    for (let i = 0; i < len; i++) {
      out += ROOM_CHARSET[Math.floor(Math.random() * ROOM_CHARSET.length)];
    }
    return out;
  }

  // ---------- Firebase helpers ----------
  function initDatabaseRefs(code) {
    roomCode = code;
    roomRef = firebase.database().ref(`rooms/${roomCode}`);
    deckRef = roomRef.child('deck');
    playersRef = roomRef.child('players');
  }

  // ---------- Room creation / join ----------
  async function createRoomFlow() {
    if (!playerId) return alert('Not signed in yet.');
    const code = makeRoomCode();
    initDatabaseRefs(code);

    // attempt to create room: initialize deck if not present
    const snap = await roomRef.once('value');
    if (!snap.exists()) {
      // build deck initial state (use ranks & suits from your index.js)
      const ranks = ["2","3","4","5","6","7","8","9","T","J","Q","K","A"];
      const suits = ["H","D","C","S"];
      const base = {};
      for (let s of suits) {
        for (let r of ranks) {
          const id = `${r}${s}`; // e.g. "AH"
          base[id] = {
            x: null, // null => in deck stack
            y: null,
            face: "down",
            owner: null,
            grabbedBy: null
          };
        }
      }
      await roomRef.set({
        deck: base,
        players: {}
      });
    }
    // add player to room
    await enterRoomAsPlayer(code);
  }

  async function joinRoom(code) {
    if (!playerId) return alert('Not signed in yet.');
    const normalized = code.trim().toUpperCase();
    const rRef = firebase.database().ref(`rooms/${normalized}`);
    const snap = await rRef.once('value');
    if (!snap.exists()) {
      return alert('Room not found: ' + normalized);
    }
    initDatabaseRefs(normalized);
    await enterRoomAsPlayer(normalized);
  }

  // ---------- Enter room logic ----------
  async function enterRoomAsPlayer(code) {
    initDatabaseRefs(code);
    // set player info in playersRef
    const pRef = playersRef.child(playerId);
    const info = {
      id: playerId,
      name: playerName,
      color: playerColor,
      handCount: 0,
      connected: true
    };
    await pRef.set(info);
    pRef.onDisconnect().remove();

    // UI indicators
    setRoomCodeBanner(code);
    ensurePlayerList();

    // set up listeners
    setupPlayersListener();
    setupDeckListeners();

    connectedToRoom = true;
    // After joining, we need to load deck state and render it locally
    // deck listener will handle the initial populate (child_added)
  }

  // ---------- Deck rendering helpers ----------
  function findCardElement(cardId) {
    if (cardElements[cardId]) return cardElements[cardId];
    // look up in DOM by class name (index.js creates class like "2H")
    const el = document.querySelector(`.card.${cardId}`);
    if (el) cardElements[cardId] = el;
    return el;
  }

  function renderCardFromState(cardId, state) {
    // ✅ HARD GUARD: Ignore corrupted partial overwrites that would yank cards from hand
    if (
      state.owner === undefined &&
      state.x === undefined &&
      state.y === undefined &&
      state.grabbedBy === undefined
    ) {
      console.warn("IGNORED CORRUPTED CARD UPDATE:", cardId, state);
      return;
    }

    const el = findCardElement(cardId);
    if (!el) return; // card DOM not yet created
    // Apply face
    if (state.face === 'up') {
      el.dataset.face = 'up';
      el.classList.remove('face-down');
      if (el.dataset.front) el.style.backgroundImage = `url("${el.dataset.front}")`;
    } else {
      el.dataset.face = 'down';
      el.classList.add('face-down');
      el.style.backgroundImage = `url("img/standard-deck/back.png")`;
    }

    // Apply owner logic
    if (state.owner && state.owner !== playerId) {
      // card is owned by someone else -> hide entirely locally
      el.style.display = 'none';
      el.dataset.inHand = 'false';
      // ensure not in handCards array of this client
      try { removeFromHand(el); } catch (e) {}
      return;
    } else {
      // card should be visible to this client
      el.style.display = 'block';
    }

    // If owner === me, make sure it's in hand layout (private)
    if (state.owner === playerId) {
      // ensure it's flagged in-hand and added
      if (el.dataset.inHand !== 'true') {
        try { addToHand(el); } catch(e) {}
      }
      // position in the hand layout will be handled by layoutHand()
      return;
    } else {
      // Not in any player's hand (public on table)
      // If it is currently in hand for this client, remove it
      if (el.dataset.inHand === 'true') {
        try { removeFromHand(el); } catch(e) {}
      }
    }

    // Apply grabbed outline
    if (state.grabbedBy) {
      el.classList.add('grabbed-outline');
      // set CSS variable for color
      // try to read player color from cache
      playersRef.child(state.grabbedBy).once('value').then(snap => {
        const p = snap.val();
        if (p && p.color) {
          el.style.setProperty('--grab-color', `${p.color}55`);
        }
      });
    } else {
      el.classList.remove('grabbed-outline');
      el.style.removeProperty('--grab-color');
    }

    // Position on table if x/y present. If null => keep in deck area (the deck div)
    // Position on table if x/y present. If null => only put into deck if card has NO owner
    if ((state.x == null || state.y == null) && !state.owner) {
      // If the local UI currently considers this card to be "inHand", do not move it.
      if (el.dataset && el.dataset.inHand === "true") {
        // keep local hand placement — server is stale or racing.
        return;
      }

      // short-lived optimistic guard: if moved locally in last 700ms, ignore server deck placement
      const now = Date.now();
      if (el.dataset.movedAt && now - Number(el.dataset.movedAt) < 700) {
        return;
      }

      const deckDiv = document.querySelector('.deck');
      if (deckDiv && el.parentElement !== deckDiv) {
        deckDiv.appendChild(el);
        el.style.left = '0px';
        el.style.top = '0px';
        el.style.transform = '';
      }
    }

     else {
      // absolute position on page
      if (document.body !== el.parentElement) {
        document.body.appendChild(el);
      }
      el.style.left = state.x + 'px';
      el.style.top = state.y + 'px';
    }
  }

  // ---------- Listeners ----------
  function setupPlayersListener() {
    playersRef.on('child_added', (snap) => {
      const p = snap.val();
      renderOrUpdatePlayerUI(p.id, p);
    });
    playersRef.on('child_changed', (snap) => {
      const p = snap.val();
      renderOrUpdatePlayerUI(p.id, p);
    });
    playersRef.on('child_removed', (snap) => {
      const p = snap.val();
      // remove element from UI
      const el = playerElements[p.id];
      if (el) el.remove();
      delete playerElements[p.id];
    });
  }

  function setupDeckListeners() {
  // child_added and child_changed both call renderCardFromState
  deckRef.on('child_added', (snap) => {
    const id = snap.key;
    const state = snap.val();
    renderCardFromState(id, state);
  });

  deckRef.on('child_changed', (snap) => {
    const id = snap.key;
    const state = snap.val();

    // DEBUG LOG: owner / lastWriter tracking
    try {
      const now = Date.now();
      const lastWriter = state.lastWriter || 'unknown';
      const lastWriteAt = state.lastWriteAt || 'unknown';
      console.log(`[DECK CHANGE] ${id} owner=${state.owner} grabbedBy=${state.grabbedBy} x=${state.x} y=${state.y} — lastWriter=${lastWriter} lastWriteAt=${lastWriteAt} (localId=${playerId})`);
    } catch (e) {
      console.log('[DECK CHANGE] (log failure)', e);
    }

    renderCardFromState(id, state);
    // update handCount of players (recompute simple way)
    recomputeHandCounts();
  });

  deckRef.on('child_removed', (snap) => {
    // not expected in this design
  });
}


  async function recomputeHandCounts() {
    const snap = await deckRef.once('value');
    if (!snap.exists()) return;

    const deck = snap.val();
    const counts = {};

    Object.keys(deck).forEach(k => {
      const owner = deck[k]?.owner;
      if (typeof owner === "string") {
        counts[owner] = (counts[owner] || 0) + 1;
      }
    });

    const playersSnap = await playersRef.once('value');
    playersSnap.forEach(child => {
      const pId = child.key;
      const c = counts[pId] || 0;
      playersRef.child(pId).update({ handCount: c });
    });
  }


  // ---------- Wrap local functions from index.js ----------
  // We assume index.js defines flipCard, addToHand, removeFromHand, startCardDrag globally.
  // We'll wrap them to also write to Firebase. If not present, we skip gracefully.

  function safeWrapGlobalFunctions() {
    // wrap flipCard
    if (typeof window.flipCard === 'function') {
      const originalFlip = window.flipCard;
      window.flipCard = function(card) {
        originalFlip(card);
        // write face state
        if (!connectedToRoom) return;
        const id = getCardId(card);
        if (!id) return;
        const face = card.dataset.face === 'up' ? 'up' : 'down';
        deckRef.child(id).update({ face });
      }
    }

    // wrap addToHand
    if (typeof window.addToHand === 'function') {
      const originalAdd = window.addToHand;
      window.addToHand = function(card) {
        originalAdd(card);
        if (!connectedToRoom) return;
        const id = getCardId(card);
        if (!id) return;
        // set owner to me and clear grabbedBy
        deckRef.child(id).update({ owner: playerId, x: null, y: null, grabbedBy: null });

      }
    }

    // wrap removeFromHand (when a card is returned to table)
    // ✅ SAVE THE ORIGINAL FIRST
    if (typeof window.removeFromHand === "function") {
      const originalRemove = window.removeFromHand;

      window.removeFromHand = function(card) {
        // ✅ Always remove locally for UI
        originalRemove(card);

        if (!connectedToRoom) return;

        const id = getCardId(card);
        if (!id) return;

        // ✅ HARD BLOCK: Never clear owner if drag started from hand
        if (card.dataset.draggingFromHand === "true") {
          const idx = handCards.indexOf(card);
          if (idx >= 0) handCards.splice(idx, 1);
          deckRef.child(id).update({
            owner: null,
            inHand: "false",
            grabbedBy: null
          });
        }

        // ✅ Only clear owner if it was truly dropped on the TABLE
        const left = parseInt(card.style.left, 10);
        const top  = parseInt(card.style.top, 10);

        const hasValidPosition =
          !isNaN(left) &&
          !isNaN(top);

        if (!hasValidPosition) return;

        deckRef.child(id).update({
          //owner: null,
          grabbedBy: null
        });
      };
    }





    // wrap startCardDrag to set grabbedBy and listen for drop
    if (typeof window.startCardDrag === 'function') {
      const originalStart = window.startCardDrag;
      window.startCardDrag = function(card, e) {
        // set firebase grabbedBy
        // ✅ If dragging from hand, set protection flag BEFORE removeFromHand can run
        if (card.dataset.inHand === "true") {
          card.dataset.draggingFromHand = "true";
        }


        try {
          const id = getCardId(card);
          if (connectedToRoom && id) {
            deckRef.child(id).update({ grabbedBy: playerId });
          }
          // also add outline locally immediately
          card.classList.add('grabbed-outline');
          card.style.setProperty('--grab-color', `${playerColor}55`);
        } catch (err) {}
        // call original which sets up mousemove/mouseup handlers.
        originalStart(card, e);

        // we need to detect when dragging stops to update position & clear grabbedBy
        // originalStart sets up a document mouseup listener named "stop" inside its closure,
        // but we can't reach it. Instead we add a one-time global mouseup to detect drop
        const onUp = async (ev) => {
          document.removeEventListener('mouseup', onUp);
          // find card id and update x/y and grabbedBy=null
          const id = getCardId(card);
          if (!id || !connectedToRoom) return;
          // If card is placed in hand (dataset.inHand === "true"), owner already set by addToHand wrapper.
          if (card.dataset.inHand === 'true') {
            // ✅ Card is staying in hand — NEVER touch owner here
            await deckRef.child(id).update({ grabbedBy: null });
            return;
          }

          // ✅ Only the TABLE PATH reaches here
          const left = parseInt(card.style.left || 0, 10);
          const top  = parseInt(card.style.top  || 0, 10);

          // ✅ HARD SAFETY GUARD — PREVENT DECK SNAP STATE
          if (isNaN(left) || isNaN(top)) {
            console.warn("Blocked invalid table drop", id);
            return;
          }

          await deckRef.child(id).update({
            x: left,
            y: top,
            grabbedBy: null,
            owner: null   // ✅ ONLY HERE. ONLY WITH VALID X/Y.
          });

        };
        document.addEventListener('mouseup', onUp);
      };
    }
  }

  // helper to get the cardId from DOM element
  function getCardId(card) {
    if (!card) return null;
    // index.js gives each card a class like "AH" / "TD"
    for (let cls of card.classList) {
      if (/^[2-9TJQKA][HDCS]$/.test(cls)) return cls;
    }
    // fallback: maybe dataset has rank/suit
    if (card.dataset && card.className) {
      const m = card.className.match(/\b([2-9TJQKA][HDCS])\b/);
      if (m) return m[1];
    }
    return null;
  }

  // ---------- Authentication ----------
  // sign in anonymously and set local player data
  function startAuthAndInit() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        playerId = user.uid;
        playerName = getRandomName();
        playerColor = getRandomColor();
        // attach handlers and UI now that we have an id
        attachMultiplayerButton();
        injectStyles();
        safeWrapGlobalFunctions();
        // show basic player info in console
        console.log('Signed in multiplayer as', playerName, playerId);
      } else {
        // no user; request sign-in
      }
    });
    firebase.auth().signInAnonymously().catch((err)=> {
      console.error('Auth error', err);
      alert('Unable to sign in for multiplayer: ' + err.message);
    });
  }

  // ---------- Utility: ensure all card DOMs are known (call once after index.js creates deck) ----------
  function cacheAllCardEls() {
    // index.js creates deck with cards as .card.CLASS
    const all = document.querySelectorAll('.card');
    all.forEach(el => {
      const id = getCardId(el);
      if (id) cardElements[id] = el;
    });
  }

  // ---------- Initialization steps ----------
  // Start auth ASAP
  startAuthAndInit();

  // When the page is loaded and your index.js has created the deck, cache elements
  window.addEventListener('load', () => {
    // small deferral to let index.js create its deck
    setTimeout(() => {
      cacheAllCardEls();
      // render initial local layout (index.js already did this)
    }, 250);
  });

  // ---------- Public small helper (optional) ----------
  window.mp = {
    joinRoom: joinRoom,
    createRoom: createRoomFlow
  };

})();