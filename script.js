let totalRounds = 0;
    let roundsLeft = 0;
    let userPoints = 0;
    let computerPoints = 0;
    let gameStarted = false;

    const gameNumberInput = document.querySelector('[data-ns-test="game-number"]');
    const playButton = document.querySelector('[data-ns-test="play-game"]');
    const rockBtn = document.querySelector('[data-ns-test="rock"]');
    const paperBtn = document.querySelector('[data-ns-test="paper"]');
    const scissorsBtn = document.querySelector('[data-ns-test="scissors"]');

    const computerChooseEl = document.querySelector('[data-ns-test="computer-choose"]');
    const roundResultEl = document.querySelector('[data-ns-test="round-result"]');
    const roundsLeftEl = document.querySelector('[data-ns-test="rounds-left"]');
    const userPointsEl = document.querySelector('[data-ns-test="user-points"]');
    const computerPointsEl = document.querySelector('[data-ns-test="computer-points"]');
    const gameResultEl = document.querySelector('[data-ns-test="game-result"]');

    window.computerChoose = 0;

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

    function getRoundResult(userChoice, computerChoice) {
      if (userChoice === computerChoice) return "TIE";
      if (
        (userChoice === 0 && computerChoice === 2) ||
        (userChoice === 1 && computerChoice === 0) ||
        (userChoice === 2 && computerChoice === 1)
      ) {
        return "WON";
      }
      return "LOSE";
    }

    function updateGameResult() {
      if (userPoints > computerPoints) gameResultEl.textContent = "WON";
      else if (userPoints < computerPoints) gameResultEl.textContent = "LOSE";
      else gameResultEl.textContent = "TIE";
    }

    function playRound(userChoice) {
      if (!gameStarted || roundsLeft <= 0) return;

      const computerChoice = getComputerChoice();
      const result = getRoundResult(userChoice, computerChoice);

      roundResultEl.textContent = result;

      if (result === "WON") userPoints++;
      else if (result === "LOSE") computerPoints++;

      roundsLeft--;
      updateUI();

      if (roundsLeft === 0) {
        updateGameResult();
      }
    }

    playButton.addEventListener("click", () => {
      totalRounds = parseInt(gameNumberInput.value);
      if (isNaN(totalRounds) || totalRounds <= 0) return;

      roundsLeft = totalRounds;
      userPoints = 0;
      computerPoints = 0;
      gameStarted = true;

      computerChooseEl.textContent = "";
      roundResultEl.textContent = "";
      gameResultEl.textContent = "";

      updateUI();
    });

    rockBtn.addEventListener("click", () => playRound(0));
    paperBtn.addEventListener("click", () => playRound(1));
    scissorsBtn.addEventListener("click", () => playRound(2));

    updateUI();
