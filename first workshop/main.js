const form = document.querySelector("#playerForm");
const input = document.querySelector("#playerName");
const playersContainer = document.querySelector("#players");
const resetFormButton = document.querySelector("#resetForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const playerName = input.value.trim();
  if (!playerName) return;
  createPlayerScoreboard(playerName);
  input.value = "";
});

let playerScores = {};

function createPlayerScoreboard(playerName) {
  const playerDiv = document.createElement("div");
  playerDiv.classList.add("player");
  playersContainer.appendChild(playerDiv);

  const avatarUrl = `https://api.dicebear.com/9.x/bottts/svg?seed=${playerName}`;
  const avatarImage = document.createElement("img");
  avatarImage.src = avatarUrl;
  avatarImage.alt = `${playerName}'s avatar`;
  avatarImage.classList.add("avatar");
  playerDiv.appendChild(avatarImage);

  const playerNameElement = document.createElement("h3");
  playerNameElement.textContent = playerName;
  playerDiv.appendChild(playerNameElement);

  const playerScoreElement = document.createElement("p");
  playerScoreElement.classList.add("score");
  playerScoreElement.textContent = "0";
  playerDiv.appendChild(playerScoreElement);

  playerScores[playerName] = 0;

  const addButton = document.createElement("button");
  addButton.textContent = "+1 punct";
  playerDiv.appendChild(addButton);

  const subtractButton = document.createElement("button");
  subtractButton.textContent = "-1 punct";
  playerDiv.appendChild(subtractButton);

  const addFiveButton = document.createElement("button");
  addFiveButton.textContent = "+5 puncte";
  playerDiv.appendChild(addFiveButton);

  const subtractFiveButton = document.createElement("button");
  subtractFiveButton.textContent = "-5 puncte";
  playerDiv.appendChild(subtractFiveButton);

  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset scor";
  playerDiv.appendChild(resetButton);

  addButton.addEventListener("click", function () {
    playerScores[playerName]++;
    playerScoreElement.textContent = playerScores[playerName];
  });

  subtractButton.addEventListener("click", function () {
    if (playerScores[playerName] > 0) playerScores[playerName]--;
    playerScoreElement.textContent = playerScores[playerName];
  });

  addFiveButton.addEventListener("click", function () {
    playerScores[playerName] += 5;
    playerScoreElement.textContent = playerScores[playerName];
  });

  subtractFiveButton.addEventListener("click", function () {
    if (playerScores[playerName] >= 5) playerScores[playerName] -= 5;
    playerScoreElement.textContent = playerScores[playerName];
  });

  resetButton.addEventListener("click", function () {
    playerScores[playerName] = 0;
    playerScoreElement.textContent = playerScores[playerName];
  });
}

const resetButton = document.querySelector("#resetScore");
//Folosesc ca sa resetez toate informatiile

resetButton.addEventListener("click", function (event) {
  event.preventDefault();
  playersContainer.innerHTML = "";
});
