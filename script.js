// gameBoard object module
// Array of three arrays, each one with three spaces
const gameBoard = (() => {
    let board = [...Array(3)].map(() => Array(3).fill(0));
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
        // displayCurrentTurn function

const displayController = (() => {
    // Render game board on page
    const renderGameBoard = () => {
        // Create and add game board table
        const gameTable = document.createElement("table");
        document.body.appendChild(gameTable);

        // Create game board table rows
        for (let i = 0; i < 3; i++) {
            const row = gameTable.insertRow(i);
            for (let j = 0; j < 3; j++) {
                const cell = row.insertCell(j);
                cell.addEventListener("click", renderMove);
            }
        }
    }
    // Render player move on game board
    const renderMove = () => {

    }
    // Track current turn
    const displayCurrentTurn = () => {

    }
    return {
        renderGameBoard,
        renderMove,
        displayCurrentTurn
    };
})();

// player object factory
    // name
    // X or O

const player = (name, symbol) => {
    return {name, symbol};
};

// Event listeners

// Run displayController.renderGameBoard() on load