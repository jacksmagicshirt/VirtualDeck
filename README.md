# Virtual Deck
an online deck of cards: play any game you want!

# Overview
While there are many existing sites for playing card games, many of them have the rules to the games built in. This can make it *Difficult* to play games with alternate rules, or *custom games*. 
If we can have an interactive deck of cards with no hard game logic baked in, then you can play any game you like.

# Features
**Multiplayer Compatibility** 
VirtualDeck uses Firebase to achieve its multiplayer feature. Firebase handles socketing, user authentication, and the tracking of multiple DOM States. 

**Automatic Shuffle**
VirtualDeck has an automated shuffle function. While Dealing cards by clicking and dragging can be satesfying, manually shuffling a whole deck of cards like that would be quite tedious. 

# Setup
HTML and CSS are used to create the client interface
index.js javascript handles the client interface for a single browser window
app.js contains the firebase code which uses wrappers to index.js to render a multiplayer game between two or more players.

# Group Members
This site was made as a final project for CSCI331 Web Development at Montana State University.
Authored by Conner Brost and Jack Hayward in December 2025. 
