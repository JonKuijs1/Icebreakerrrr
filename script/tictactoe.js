let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

window.onload = function() {
    blinkTurnMessage(); // Start blinking the turn message
};

function makeMove(index) {
    if (board[index] === '') {
        board[index] = currentPlayer;
        renderBoard();
        if (checkWinner(currentPlayer)) {
            alert(currentPlayer + ' wins!');
            playWinSound(); // Play the win sound
            markWinningCells(); // Mark winning cells with animation
            resetGame();
            return;
        }
        if (board.every(cell => cell !== '')) {
            alert("It's a draw!");
            resetGame();
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playMoveSound(); // Play the move sound
        blinkTurnMessage(); // Start blinking the turn message for the next player
    }
}

function displayMessage(message) {
    alert(message);
}

function checkWinner(player) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === player)
    );
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
        cell.classList.remove('X', 'O'); // Remove classes 'X' and 'O' from all cells
        if (board[index] === 'X' || board[index] === 'O') {
            cell.classList.add(board[index]); // Add class 'X' or 'O' to cells containing 'X' or 'O'
        }
    });
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
}

function playWinSound() {
    const winSound = document.getElementById('winSound');
    winSound.play();
}

function markWinningCells() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        if (checkWinner(currentPlayer) && cells[i].textContent === currentPlayer) {
            cells[i].classList.add('win');
        }
    }
}

function playMoveSound() {
    const moveSound = currentPlayer === 'X' ? document.getElementById('xMoveSound') : document.getElementById('oMoveSound');
    moveSound.play();
}

function blinkTurnMessage() {
    const turnText = document.getElementById('turnText');
    setInterval(() => {
        turnText.style.visibility = (turnText.style.visibility === 'hidden') ? 'visible' : 'hidden';
        // Update text content based on currentPlayer
        turnText.textContent = "It's " + currentPlayer + "'s Turn 💬";
    }, 2000);
}
