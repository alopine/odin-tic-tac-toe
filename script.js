// Main objects

const gameBoard = (() => {
    // Initialize
    let board = [...Array(3)].map(() => Array(3).fill(""));
    let winStatus = false;
    let winner;

    return {
        board,
        winStatus,
        winner
    };
})();


const displayController = (() => {
    // Render game board on page
    const renderGameBoard = () => {
        // Create and add game board table
        const gameTable = document.createElement("table");
        document.body.appendChild(gameTable);
        // Create game board table rows and cells
        for (let i = 0; i < 3; i++) {
            const row = gameTable.insertRow(i);
            for (let j = 0; j < 3; j++) {
                const cell = row.insertCell(j);
                cell.addEventListener("click", renderMove);
            }
        }
        // Create current player and winner display
        ["playerDisplay", "winDisplay"].forEach((item => {
            const div = document.createElement("div");
            div.setAttribute("id", item);
            document.body.appendChild(div);
        }))
    }
    // Clear game board
    const clearGameBoard = () => {
        const gameCells = document.querySelectorAll("td");
        gameCells.forEach(cell => {
            cell.textContent = "";
        });
        const displayDivs = document.querySelectorAll("div");
        displayDivs.forEach(div => {
            div.textContent = "";
        });
        gameBoard.board = [...Array(3)].map(() => Array(3).fill(""));
        gameBoard.winStatus = false;
        gameBoard.winner = null;
        currentTurn = 1;
    }
    // Render player move on game board
    const renderMove = (evt) => {
        // Check for clicked cell content and win conditions met
        const clickedCell = evt.currentTarget;
        if (!clickedCell.textContent && !checkWinner()) {
            // Place current player marker into array and game board space
            gameBoard.board[clickedCell.parentNode.rowIndex][clickedCell.cellIndex] = currentPlayer().marker;
            clickedCell.textContent = currentPlayer().marker;
            // Update current turn
            currentTurn++;
        } else {
            return;
        }
        displayWinner();
    }
    // Check for winner
    const checkWinner = () => {
        // Check horizontal and vertical rows
        for (let i = 0; i < 3; i++) {
            if (gameBoard.winStatus = (gameBoard.board[i][0] !== "") && (gameBoard.board[i][0] === gameBoard.board[i][1] && gameBoard.board[i][0] === gameBoard.board[i][2])) {
                gameBoard.winner = (gameBoard.board[i][0] === playerOne.marker) ? playerOne : playerTwo;
                break;
            } else if (gameBoard.winStatus = (gameBoard.board[0][i] !== "") && (gameBoard.board[0][i] === gameBoard.board[1][i] && gameBoard.board[0][i] === gameBoard.board[2][i])) {
                gameBoard.winner = (gameBoard.board[0][i] === playerOne.marker) ? playerOne : playerTwo;
                break;
            }
        }
        // If no winner, check diagonal rows
        if (!gameBoard.winStatus) {
            if (gameBoard.winStatus = (gameBoard.board[1][1] !== "") && ((gameBoard.board[1][1] === gameBoard.board[0][0] && gameBoard.board[1][1] === gameBoard.board[2][2]) || (gameBoard.board[1][1] === gameBoard.board[0][2] && gameBoard.board[1][1] === gameBoard.board[2][0]))) {
                gameBoard.winner = (gameBoard.board[1][1] === playerOne.marker) ? playerOne : playerTwo;
            }
        }
        // Return variables
        return gameBoard.winStatus;
    }
    // Track current turn
    let currentTurn = 1;
    const currentPlayer = () => {
        const playerDisplay = document.getElementById("playerDisplay");
        if (currentTurn % 2 !== 0) {
            playerDisplay.textContent = `Round ${currentTurn}: ${playerOne.name}`;
            return playerOne;
        } else {
            playerDisplay.textContent = `Round ${currentTurn}: ${playerTwo.name}`;
            return playerTwo;
        }
    }
    // Display winner
    const displayWinner = () => {
        const winDisplay = document.getElementById("winDisplay");
        if (!checkWinner() && !gameBoard.board.every(row => row.every(cell => cell !== ""))) {
            winDisplay.textContent = "";
        } else if (checkWinner()) {
            winDisplay.textContent = `${gameBoard.winner.name} wins!`;
        } else {
            winDisplay.textContent = `Draw!`;
        }
    }

    return {
        renderGameBoard,
        clearGameBoard,
        renderMove
    };
})();


const player = (name, marker) => {
    return {name, marker};
};

const playerOne = player("", "X");
const playerTwo = player("", "O");



// Event listeners

const startButton = document.getElementById("playButton");
const inputPlayerOne = document.getElementById("playerOne");
const inputPlayerTwo = document.getElementById("playerTwo");

startButton.addEventListener("click", () => {
    if (!inputPlayerOne.value || !inputPlayerTwo.value) {
        window.alert("Please fill in the names of both players.");
        return;
    } else if (startButton.textContent === "Restart") {
        displayController.clearGameBoard();
    } else {
        displayController.renderGameBoard();
        startButton.textContent = "Restart";
    }
    playerOne.name = inputPlayerOne.value;
    playerTwo.name = inputPlayerTwo.value;
})