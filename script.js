// Initialize a variable to keep track of the current player (X or O)
let currentPlayer = 'X';
let xsum = [];
let xcount = 0;
let osum = [];
let ocount = 0;
const gameWin = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
let gameOver = false;

// Function to handle clicking on a cell
function handleCellClick(event) {
  // Get the clicked cell element
  const square = event.target;

  if (gameOver) {
    return; // If the game is already over, exit the function
  }

  // If the square has already been clicked, exit the function
  if (square.disabled) {
    return;
  }

  // Add the current player's symbol to the cell
  square.textContent = currentPlayer;

  // Disable the square so it can't be clicked again
  square.disabled = true;

  // Logic for gamwin combinations START here
  if (currentPlayer === 'X') {
    xsum.push(Number(square.id));
    xsum.sort();
 
    for (let i = 0; i < gameWin.length; i++){
      if (gameWin.some(combination => combination.every(cell => xsum.includes(cell)))) {
        alert("Player one has won");
        gameOver = true;
        return;
      }
    }

    xcount += 1;


  } 

  // Logic for O player
  else {
    osum.push(Number(square.id));
    osum.sort();
    ocount += 1;
    for (let i = 0; i < gameWin.length;i++){
      if (gameWin.some(combination => combination.every(cell => osum.includes(cell)))) {
        alert("Player two has won");
        gameOver = true;
        return;
      }
    }
  }
  // Logic for gamwin combinations END here

  // Check for a tie
  if (xcount + ocount === 9) {
    alert("It's a tie!");
    gameOver = true;
    return;
  }

  // Switch to the other player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Get all the cells in the Tic Tac Toe board
const squares = document.querySelectorAll('.square');

// Attach a click event listener to each cell
squares.forEach(square => {
  square.addEventListener('click', handleCellClick);
});

// Function to reset the game
function resetGame() {
  // Reset the board
  squares.forEach(square => {
    square.textContent = '';
    square.disabled = false;
  });

  // Reset the game variables
  currentPlayer = 'X';
  xsum = [];
  xcount = 0;
  osum = [];
  ocount = 0;
  gameOver = false;
}

// Get the reset button element
const resetButton = document.getElementById('reset-button');

// Attach a click event listener to the reset button
resetButton.addEventListener('click', resetGame);
