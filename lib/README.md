# Connect Four Game Documentation

## Introduction
This document details the implementation of the Connect Four game using standard web technologies: HTML, CSS, and JavaScript. The game offers an interactive experience where two players take turns trying to align four of their respective colored discs.

## File Structure

### HTML
The HTML file defines the structural layout of the game page. It includes:
- `gameContainer`: The main container that wraps around the game board and auxiliary elements.
- `gameBoard`: The grid where players place their discs.
- `startModal` and `endModal`: Modals for starting and ending the game, displaying messages and buttons to begin or restart the game.
- Links to CSS for styling and JavaScript for game logic.

### CSS
The `styles.css` file sets the visual style of the game. Key points include:
- `#gameBoard`: Styles the game board with grid properties to align game cells properly.
- `.cell`: Styles individual game cells where players place their discs.
- `.modal`: Styles for the modal windows.
- Dynamic styles to change cell background color based on the current player using the CSS variable `--current-player-color`.

### JavaScript
The `script.js` file contains all game logic. Key functions include:
- **Event Handling**: Event listeners for button clicks and game cell clicks.
- **createBoard()**: Dynamically creates the game board by appending divs for each cell, set up to respond to clicks.
- **playMove()**: Manages placing discs in the board columns and checks for win conditions.
- **checkWin()** and **checkDirection()**: Functions to check if a player has won after each move.
- **resetGame()** and **changePlayer()**: Functions to restart the game and switch the current player.

## User Interaction
Interaction with the game is primarily through mouse clicks:
- **Start the Game**: The player clicks "Start Game" in `startModal`.
- **Make a Move**: The player clicks a column on `gameBoard`.
- **Restart the Game**: After a win, clicking "Restart" in `endModal` restarts the game.

## Technical Details

### Game Initialization
The game begins by displaying `startModal`. When the player clicks "Start Game", the modal is hidden, and the game board is initialized with 42 empty cells.

### Game Play
When a cell is clicked, `playMove()` is triggered. The current player's disc is placed in the selected column at the lowest available position. The function then checks if this move results in a win.

### Win Check
`checkWin()` verifies if there are four aligned discs in any possible direction. If a win condition is detected, `endModal` is displayed with the winner's name.

### Game Reset
`resetGame()` is used to clear the board and reset the game to its initial state, allowing for a new game without needing to reload the page.

## Conclusion
This technical documentation describes the structure and functionality of the Connect Four game. It is intended to provide sufficient detail to allow developers to understand, extend, or modify the game.

