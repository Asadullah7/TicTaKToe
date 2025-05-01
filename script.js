const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const resultScreen = document.getElementById("resultScreen");
const resultMessage = document.getElementById("resultMessage");
const newGameBtn = document.getElementById("newGameBtn");

let currentPlayer = "X";
let boardState = Array(9).fill("");
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    board.appendChild(cell);
  }
}
createBoard();

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || boardState[index] !== "") return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    showResult(`🎉 Player ${currentPlayer} Wins!`);
    gameActive = false;
  } else if (boardState.every(cell => cell !== "")) {
    showResult("😐 It's a Draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}

function showResult(message) {
  resultMessage.textContent = message;
  resultScreen.style.display = "flex";
}

function restartGame() {
  boardState = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's Turn";
  resultScreen.style.display = "none";
  createBoard();
  addListeners();
}

function addListeners() {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", handleCellClick);
  });
}

addListeners();
restartBtn.addEventListener("click", restartGame);
newGameBtn.addEventListener("click", restartGame);
