function Gameboard() {
  const board = Array(9).fill("Empty");

  const placeMark = (index, mark) => {
    if (board[index] === "Empty") {
      board[index] = mark;
      console.log("Placed: " + mark);
      return true;
    }
    return false;
  };

  //Stores winning combos as either all columns, rows or diagonals.
  /// board Structure:
  ///  0 1 2
  ///  3 4 5
  //   6 7 8

  const checkWin = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winningCombos.some(([a, b, c]) => {
      return (
        board[a] !== "Empty" && board[a] === board[b] && board[b] === board[c]
      ); //looks for a single match by destructuring into a,b,c
    });
  };

  return { board, placeMark, checkWin }; //returns the whole object
}

function createPlayer(playerNum, mark) {
  //creates the player object and stores their respective mark

  return { playerNum, mark };
}

function driver() {
  // is used to control the game flow
  const gameBoard = Gameboard();
  const player1 = createPlayer(1, "X");
  const player2 = createPlayer(2, "O");
  let currentPlayer = player1;
  let stop = false;
  console.log("current player " + currentPlayer.playerNum);

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1; //if statement to check current and switch accordingly
  };
  const getPlayer = () => currentPlayer;

  const play = (index) => {
    if (stop) return false;

    if (gameBoard.placeMark(index, currentPlayer.mark)) {
      //places the marker only if empty
      if (gameBoard.checkWin()) {
        //checks status
        console.log(`Player ${currentPlayer.playerNum} wins!`);
        document.getElementById( "message" ).textContent = `Player ${currentPlayer.playerNum} wins!`;
        stop = true;
      } else if (gameBoard.board.every((cell) => cell !== "Empty")) {
        document.getElementById(  "message"  ).textContent = `It's a tie!`;
        gameOver = true;

      } else {
        switchPlayer(); //next players turn
        document.getElementById(  "message"  ).textContent = `Player ${currentPlayer.playerNum}'s turn`;
        gameOver = true;
        console.log(`It's now Player ${currentPlayer.playerNum}'s turn`);
      }
      return true;
    }
    return false;
  };
  return { play, getPlayer }; //returns the updated play object only as rest are private
}



function start() {
  const game = driver();
  const squares = document.querySelectorAll(".square");

  document.getElementById(  "message"  ).textContent = `Player 1's turn`;


  squares.forEach((square) => {
    square.addEventListener("click", () => {
      const index = parseInt(square.dataset.index);
      const currentMark = game.getPlayer().mark;

      if (game.play(index)) {
        square.textContent = currentMark;
      }
    });
  });
}

start(); //starts the game

//resets page
document.getElementById("reset").addEventListener("click", () => {
  location.reload(); // Reloads the entire page
});
