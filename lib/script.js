document.addEventListener('DOMContentLoaded', function() {
    const startModal = document.getElementById('startModal');
    const endModal = document.getElementById('endModal');
    const winnerAnnouncement = document.getElementById('winnerAnnouncement');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const board = document.getElementById('gameBoard');
    let currentPlayer = 'red'; // Initialise le joueur courant à 'red'

    startModal.style.display = 'block'; // Affiche le modal de démarrage au chargement

    startButton.addEventListener('click', function() {
        startModal.style.display = 'none';
        board.style.display = 'grid'; // Affiche le plateau de jeu
        createBoard();
    });

    restartButton.addEventListener('click', function() {
        endModal.style.display = 'none';
        resetGame();
    });

    function createBoard() {
        board.innerHTML = ''; // Nettoie le plateau pour éviter les doublons
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', playMove);
                board.appendChild(cell);
            }
        }
    }

    function resetGame() {
        createBoard(); // Recrée le plateau
        currentPlayer = 'red'; // Réinitialise le joueur à 'red'
        document.documentElement.style.setProperty('--current-player-color', 'red');
    }

    function playMove(e) {
        const col = e.target.dataset.col;
        for (let row = 5; row >= 0; row--) {
            const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
            if (!cell.classList.contains('red') && !cell.classList.contains('yellow')) {
                cell.classList.add(currentPlayer);
                if (checkWin()) {
                    endModal.style.display = 'block';
                    winnerAnnouncement.textContent = `Well done, ${currentPlayer} player win!`;
                    return;
                }
                changePlayer();
                break;
            }
        }
    }

    function changePlayer() {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        document.documentElement.style.setProperty('--current-player-color', currentPlayer);
    }

    function checkWin() {
        return checkDirection(-1, 0) || checkDirection(1, 0) ||  
               checkDirection(0, 1) || checkDirection(0, -1) ||  
               checkDirection(-1, -1) || checkDirection(1, 1) || 
               checkDirection(-1, 1) || checkDirection(1, -1);   
    }

    function checkDirection(deltaRow, deltaCol) {
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
                if (cell.classList.contains(currentPlayer) && checkLine(cell, deltaRow, deltaCol)) {
                    return true;
                }
            }
        }
        return false;
    }

    function checkLine(cell, deltaRow, deltaCol) {
        let count = 1;
        let row = parseInt(cell.dataset.row);
        let col = parseInt(cell.dataset.col);
        for (let i = 1; i < 4; i++) {
            row += deltaRow;
            col += deltaCol;
            const nextCell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
            if (nextCell && nextCell.classList.contains(currentPlayer)) {
                count++;
            } else {
                break;
            }
        }
        return count >= 4;
    }
});
