//Suhail Tailor
//Odin project - Tic-Tac-Toe

//makes the gameboard array and fills with "Empty" 
//Has checkwin function to check game status
//Has Placemark to place a players choice

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

function createPlayer(name, mark) {
    //creates the player object and stores their respective mark

    return { name, mark };
}


  // is used to control the game flow
function driver(name1, name2) {
  
    const gameBoard = Gameboard();
    const player1 = createPlayer(name1, "X");
    const player2 = createPlayer(name2, "O");
    let currentPlayer = player1;
    let stop = false;

    console.log("current player " + currentPlayer.name);

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1; //if statement to check current and switch accordingly
    };


    const getPlayer = () => currentPlayer;//returns current player


    const play = (index) => {
        if (stop) return false;

        if (gameBoard.placeMark(index, currentPlayer.mark)) { //places the marker only if empty
           
            if (gameBoard.checkWin()) { //checks status
               
                console.log(`Player ${currentPlayer.name} wins!`);
                document.getElementById ("message").textContent = `${currentPlayer.name} wins!`;
                if (currentPlayer === player1) {//update scores
                    score1++;
                } else {
                    score2++;
                }

                document.getElementById("score1").textContent = `${player1.name}: ${score1}`;//update player scores displayed
                document.getElementById("score2").textContent = `${player2.name}: ${score2}`;
                stop = true
                }  
            else if (gameBoard.board.every((cell) => cell !== "Empty")) 
                {
                document.getElementById("message").textContent = `It's a tie!`;

                stop = true; 
                } 
            else {
                switchPlayer(); //next players turn
                document.getElementById(
                    "message"
                ).textContent = `${currentPlayer.name}'s turn (${currentPlayer.mark})`;

                console.log(`It's now Player ${currentPlayer.name}'s turn`);
            }
            return true;
        }
        return false;
    };
    return { play, getPlayer }; //returns the updated play object only as rest are private
}


const squares = document.querySelectorAll(".square");//store all squares

function start(name1, name2) {
    const game = driver(name1, name2);

    document.getElementById("score1").textContent = `${name1}: ${score1}`;//update score board with names
    document.getElementById("score2").textContent = `${name2}: ${score2}`;//update score board with names

    document.getElementById("message").textContent = `${name1}'s turn (X)`;//update current player name on display

    squares.forEach((square) => {//
        square.addEventListener("click", () => {
            const index = parseInt(square.dataset.index);
            const currentMark = game.getPlayer().mark;

            if (game.play(index)) {//if this position can be played
                square.textContent = currentMark;//place mark
            }
        });
    });
}

//variables to be used globally 
let score1 = 0;
let score2 = 0;
let name1 = ''
let name2 = ''


//resets game
document.getElementById("reset").addEventListener("click", () => {
   
    squares.forEach((square) => {
        square.textContent = "";
    });
    start(name1, name2);
});

//reload page, clear saved data
document.getElementById("clear").addEventListener("click", () => {
    location.reload(); // Reloads the entire page    
});



const startBtn = document.getElementById("startGame");
const infoDiv = document.getElementById("nameInputs");

//listens at start button for trigger
startBtn.addEventListener("click", () => {
    name1 = document.getElementById("player1Name").value || "Player 1";
    name2 = document.getElementById("player2Name").value || "Player 2";
    infoDiv.style.display = "none";

    start(name1, name2);


});
