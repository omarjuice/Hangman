# Hangman (client)
## A multiplayer chat app and hangman game.
Players can play hangman and chat with anyone and anywhere.
This web app is mobile responsive. It uses the Oxford Dictionary and Urban Dictionary APIs.

## User Experience

At the join page, a user can enter a username and a room they would like to enter. If a room of the chosen name does not exist, the user will be asked to choose a dictionary for that room. Then users will be taken to a room where they can chat, and if there are at least 2 players, play hangman.

## GamePlay
 In the Urban or Oxford Dictionary rooms, players can choose a word and the app will choose a hint for them. In the Free-For-All rooms, players make their own hints. The max number of players per room is capped at 5.

Players get 60 seconds per turn and 5 incorrect guesses. For each correct letter, the player is awarded 1 point. Meaning partial credit even if the word is not complete. If the word is not completely guessed, the word-picker is awarded 5 points.
The players take turns choosing words, and word choosers do not partake in the game that they choose for.

### Made with Socket.io, Node, React, Redux, and AnimeJS.

[Server code](https://github.com/OmarJuice/Hangman-server)