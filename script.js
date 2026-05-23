let totalRounds = 0;
let roundsLeft = 0;
let userPoints = 0;
let computerPoints = 0;
let gameStarted = false;

function $(val) {
  return document.querySelector(`[data-ns-test="${val}"]`);
}

window.computerChoose = 0;

document.addEventListener("DOMContentLoaded", () => {
  const gameNumberInput = $("game-number");
  const playButton = $("play-game");
  const rockBtn = $("rock");
  const paperBtn = $("paper");
  const scissorsBtn = $("scissors");

  const computerChooseEl = $("computer-choose");
  const roundResultEl = $("round-result");
  const roundsLeftEl = $("rounds-left");
  const userPointsEl = $("user-points");
  const computerPointsEl = $("computer-points");
  const gameResultEl = $("game-result");

  if (!gameNumberInput || !playButton || !rockBtn || !paperBtn || !scissorsBtn) return;

  function updateUI() {
    roundsLeftEl.textContent = roundsLeft;
    userPointsEl.textContent = userPoints;
    computerPointsEl.textContent = computerPoints;
  }

  function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);
    window.computerChoose = choice;
    computerChooseEl.textContent = ["ROCK", "PAPER", "SCISSORS"][choice];
    return choice;
  }

  function getResult(userChoice, computerChoice) {
    if (userChoice === computerChoice) return "TIE";
    if (
      (userChoice === 0 && computerChoice === 2) ||
      (userChoice === 1 && computerChoice === 0) ||
      (userChoice === 2 && computerChoice === 1)
    ) return "WON";
    return "LOSE";
  }

  function endGame() {
    if (userPoints > computerPoints) gameResultEl.textContent = "WON";
    else if (userPoints < computerPoints) gameResultEl.textContent = "LOSE";
    else gameResultEl.textContent = "TIE";
  }

  function playRound(userChoice) {
    if (!gameStarted || roundsLeft <= 0) return;

    const computerChoice = getComputerChoice();
    const result = getResult(userChoice, computerChoice);

    roundResultEl.textContent = result;

    if (result === "WON") userPoints++;
    else if (result === "LOSE") computerPoints++;

    roundsLeft--;
    updateUI();

    if (roundsLeft === 0) endGame();
  }

  playButton.addEventListener("click", () => {
    totalRounds = parseInt(gameNumberInput.value);
    if (isNaN(totalRounds) || totalRounds <= 0) return;

    roundsLeft = totalRounds;
    userPoints = 0;
    computerPoints = 0;
    gameStarted = true;

    roundResultEl.textContent = "";
    computerChooseEl.textContent = "";
    gameResultEl.textContent = "";
    updateUI();
  });

  rockBtn.addEventListener("click", () => playRound(0));
  paperBtn.addEventListener("click", () => playRound(1));
  scissorsBtn.addEventListener("click", () => playRound(2));

  updateUI();
});