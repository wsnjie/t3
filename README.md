Overview
============
Link to Github Pages deployment: [Here!](https://wsnjie.github.io/t3/)

T3 (or "T"ic "T"ac "T"oe) is a JavaScript represantation of the game Tic Tac Toe. This project is written with vanilla JS, no additional libraries or frameworks. It was written as a coding challenge that I started on Wednesday evening and submitted Friday morning. I focused on making sure the game fuctionality was sound first, and then added UI elements to make it easy for the players to enjoy the game.

Game Logic
============
The gameboard object keeps track of moves made by players and also holds the logic to check for a win, three in a row, three in a column, or three diagonally. If there is a win, it then updates an element on the page to show the player who won.

Notes
============
Since I wrote this without using library for DOM maniplution(like jQuery), there is alot of code related to handling event listeners and updating elements. For future implementations, I would like to trim this code down as much as possible. Also, there is an issue with the reset button not working after the first initial reset that needs to be addressed, but the user can simply reload the page to play another game. I would like the reset to work as expected, but in the interest of time, I'll make that an issue for version 2.