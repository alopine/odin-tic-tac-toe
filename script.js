const gameBoard = (() => {
    let board = [...Array(3)].map(() => Array(3).fill(""));
    return {board};
})();


// displayController object module
        // renderGameBoard function
            // Add game table
            // Loop to insert 3 rows
                // Loop to insert three cells per row
                    // Add event listener click, renderMove
        // renderMove function
            // Check if clicked cell already has content (ie if gameBoard.board[rowIndex][cellIndex] is empty or not)
                // If empty
                    // Check whose turn it is and what their symbol is
                    // Insert symbol into gameBoard.board[rowIndex][cellIndex] and into clicked cell
        // trackTurn function

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
        // Check clicked cell for content
        const clickedCell = evt.currentTarget;
        if (!clickedCell.textContent) {
            // Plug current player symbol into gameBoard.board
            gameBoard.board[clickedCell.parentNode.rowIndex][clickedCell.cellIndex] = trackTurn().symbol;
            clickedCell.textContent = trackTurn().symbol;
            currentTurn++;
        } else {
            window.alert("Space already filled!");
        }

    }
    // Track current turn
    let currentTurn = 1;
    const trackTurn = () => {
        if (currentTurn % 2 !== 0) {
            return playerOne;
        } else {
            return playerTwo;
        }
    }
    return {
        renderGameBoard,
        renderMove,
        trackTurn
    };
})();

// player object factory
    // name
    // X or O

const player = (name, symbol) => {
    return {name, symbol};
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
        playerOne.name = inputPlayerOne.textContent;
        playerTwo.name = inputPlayerTwo.textContent;
    }
})