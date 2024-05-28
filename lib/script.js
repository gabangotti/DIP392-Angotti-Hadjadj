document.addEventListener('DOMContentLoaded', function() {
    class Game {
        constructor() {
            this.startModal = document.getElementById('startModal');
            this.endModal = document.getElementById('endModal');
            this.winnerAnnouncement = document.getElementById('winnerAnnouncement');
            this.startButton = document.getElementById('startButton');
            this.restartButton = document.getElementById('restartButton');
            this.board = document.getElementById('gameBoard');
            this.players = [new Player('red'), new Player('yellow')];
            this.currentPlayerIndex = 0; 

            this.init();
        }

        init() {
            if (this.startModal) {
                this.startModal.style.display = 'block';
            }

            if (this.startButton) {
                this.startButton.addEventListener('click', () => this.startGame());
            }

            if (this.restartButton) {
                this.restartButton.addEventListener('click', () => this.resetGame());
            }
        }

        startGame() {
            if (this.startModal) this.startModal.style.display = 'none';
            if (this.board) this.board.style.display = 'grid'; 
            this.createBoard();
        }

        resetGame() {
            this.createBoard();
            this.currentPlayerIndex = 0; 
            document.documentElement.style.setProperty('--current-player-color', this.players[this.currentPlayerIndex].color);
            if (this.endModal) this.endModal.style.display = 'none';
        }

        createBoard() {
            if (!this.board) return;
            this.board.innerHTML = ''; 
            for (let row = 0; row < 6; row++) {
                for (let col = 0; col < 7; col++) {
                    const cell = new Cell(row, col);
                    cell.element.addEventListener('click', (e) => this.playMove(e));
                    this.board.appendChild(cell.element);
                }
            }
        }

        playMove(e) {
            const col = e.target.dataset.col;
            for (let row = 5; row >= 0; row--) {
                const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
                if (cell && !cell.classList.contains('red') && !cell.classList.contains('yellow')) {
                    cell.classList.add(this.players[this.currentPlayerIndex].color);
                    if (this.checkWin()) {
                        if (this.endModal) this.endModal.style.display = 'block';
                        if (this.winnerAnnouncement) this.winnerAnnouncement.textContent = `Well done, ${this.players[this.currentPlayerIndex].color} player wins!`;
                        return;
                    }
                    this.changePlayer();
                    break;
                }
            }
        }

        changePlayer() {
            this.currentPlayerIndex = 1 - this.currentPlayerIndex; 
            document.documentElement.style.setProperty('--current-player-color', this.players[this.currentPlayerIndex].color);
        }

        checkWin() {
            return this.checkDirection(-1, 0) || this.checkDirection(1, 0) ||  
                   this.checkDirection(0, 1) || this.checkDirection(0, -1) ||  
                   this.checkDirection(-1, -1) || this.checkDirection(1, 1) || 
                   this.checkDirection(-1, 1) || this.checkDirection(1, -1);   
        }

        checkDirection(deltaRow, deltaCol) {
            for (let row = 0; row < 6; row++) {
                for (let col = 0; col < 7; col++) {
                    const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
                    if (cell && cell.classList.contains(this.players[this.currentPlayerIndex].color) && this.checkLine(cell, deltaRow, deltaCol)) {
                        return true;
                    }
                }
            }
            return false;
        }

        checkLine(cell, deltaRow, deltaCol) {
            let count = 1;
            let row = parseInt(cell.dataset.row);
            let col = parseInt(cell.dataset.col);
            for (let i = 1; i < 4; i++) {
                row += deltaRow;
                col += deltaCol;
                const nextCell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
                if (nextCell && nextCell.classList.contains(this.players[this.currentPlayerIndex].color)) {
                    count++;
                } else {
                    break;
                }
            }
            return count >= 4;
        }
    }

    class Player {
        constructor(color) {
            this.color = color;
        }
    }

    class Cell {
        constructor(row, col) {
            this.element = document.createElement('div');
            this.element.classList.add('cell');
            this.element.dataset.row = row;
            this.element.dataset.col = col;
        }
    }

    new Game();
});
