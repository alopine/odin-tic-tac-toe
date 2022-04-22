// Main objects

const gameBoard = (() => {
    // Initialize game board
    let board = [...Array(3)].map(() => Array(3).fill(""));

    // Check for winner
    const checkWinner = () => {
        // Declare variables
        let winStatus = false;
        let winner;
        // Check horizontal and vertical rows
        for (let i = 0; i < 3; i++) {
            if ((board[i][0] !== "") && (winStatus = board[i][0] === board[i][1] && board[i][0] === board[i][2])) {
                winner = (board[i][0] === playerOne.marker) ? playerOne : playerTwo;
                break;
            } else if ((board[0][i] !== "") && (winStatus = board[0][i] === board[1][i] && board[0][i] === board[2][i])) {
                winner = (board[0][i] === playerOne.marker) ? playerOne : playerTwo;
                break;
            }
        }
        // If no winner][check diagonal rows
        if (!winStatus && board[1][1] !== "") {
            if (winStatus = (board[1][1] === board[0][0] && board[1][1] === board[2][2]) || (board[1][1] === board[0][2] && board[1][1] === board[2][0])) {
                winner = (board[1][1] === playerOne.marker) ? playerOne : playerTwo;
            }
        }
        // Return variables
        return [winStatus, winner];
    }

    return {
        board,
        checkWinner
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
    }
    // Render player move on game board
    const renderMove = (evt) => {
        // Check for clicked cell content and win conditions met
        const clickedCell = evt.currentTarget;
        if (!clickedCell.textContent && !gameBoard.checkWinner()[0]) {
            // Place current player marker into array and game board space
            gameBoard.board[clickedCell.parentNode.rowIndex][clickedCell.cellIndex] = currentPlayer().marker;
            clickedCell.textContent = currentPlayer().marker;
            // Update current turn
            currentTurn++;
        } else {
            return;
        }

    }
    // Track current turn
    let currentTurn = 1;
    const currentPlayer = () => {
        if (currentTurn % 2 !== 0) {
            return playerOne;
        } else {
            return playerTwo;
        }
    }

    return {
        renderGameBoard,
        renderMove,
        currentPlayer
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
        window.alert("Please fill in the names of both players.")
    } else {
        displayController.renderGameBoard();
        playerOne.name = inputPlayerOne.value;
        playerTwo.name = inputPlayerTwo.value;
    }
})