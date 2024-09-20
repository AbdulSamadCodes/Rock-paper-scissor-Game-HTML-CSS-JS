import { GameOption, renderGameOption } from "./render_game_options.js";

const gameWindowWrapper = document.querySelector("[data-dame-window-wrapper]");
const pentagonFigureWrapper = document.querySelector("[data-pentagon-figure-wrapper]");

//function to handle the contest creation
function handleContestCreation() {
  pentagonFigureWrapper.addEventListener("click", (event) => {
    if (!(event.target.classList.contains("game-option") || event.target.parentElement.matches(".game-option"))) return;

    const userSelectedOption = event.target.classList.contains("game-option") ? event.target : event.target.parentElement;

    handleContest(userSelectedOption.dataset.option);
  });
}

handleContestCreation();

// function to remove the previous states of game from UI
const removeGameState = state => state.style.display = "none";

//function to handle the contest
function handleContest(userSelectedOption) {
  let userSelectedObject, CPUSelectedObject;

  removeGameState(pentagonFigureWrapper);

  const contestOptionsContainer = document.createElement("div");
  contestOptionsContainer.classList.add("contest-options-container", "flex", "align-items-center", "justify-content-between");

  //shadow documnent fragment
  const contestFragment = document.createDocumentFragment();

  const userOptionWrapper = document.createElement("div");
  const CPUOptionWrapper = document.createElement("div");

  [userOptionWrapper, CPUOptionWrapper].forEach((optionWrapper) => {
    optionWrapper.classList.add("option-wrapper", "flex", "justify-content-center", "align-items-center");

    const wrapperText = document.createElement("p");
    wrapperText.classList.add("option__wrapper-text", "uppercase");
    optionWrapper.appendChild(wrapperText);

    contestOptionsContainer.appendChild(optionWrapper);
  })

  const userOptionContainer = document.createElement("span");
  const CPUOptionContainer = document.createElement("span");

  [userOptionContainer, CPUOptionContainer].forEach((optionContainer, index) => {
    optionContainer.classList.add("option-container");
  });

  userOptionWrapper.querySelector(".option__wrapper-text").textContent = "You Picked";
  userOptionWrapper.appendChild(userOptionContainer);

  CPUOptionWrapper.querySelector(".option__wrapper-text").textContent = "The House Picked";
  CPUOptionWrapper.appendChild(CPUOptionContainer);

  contestFragment.appendChild(contestOptionsContainer);
  gameWindowWrapper.appendChild(contestFragment);

  //render and  user option
  userSelectedObject = renderUserOption(userSelectedOption, userOptionContainer);

  //render and get the CPU option
  setTimeout(() => {
    CPUSelectedObject = renderCPUOption(CPUOptionContainer);
    const winnerOrDraw = validateContest(userSelectedObject, CPUSelectedObject);

    displayResult(gameWindowWrapper, winnerOrDraw);
  }, 2000);
}

//function to render the user selected option
function renderUserOption(userOption, optionContainer) {
  const userSelectedObject = gameOptions.find((gameOption) => gameOption.name === userOption);

  renderGameOption(optionContainer, userSelectedObject.name, userSelectedObject.metaData.imgSrc);

  return userSelectedObject;
}

//function to select and render the random CPU selected option
function renderCPUOption(optionContainer) {
  const totalGameOptions = gameOptions.length;

  const CPUSelectedIndex = Math.floor(Math.random() * totalGameOptions);
  const CPUSelectedObject = gameOptions[CPUSelectedIndex];

  renderGameOption(optionContainer, CPUSelectedObject.name, CPUSelectedObject.metaData.imgSrc);

  return CPUSelectedObject;
}

//function to validate the contest results and display on UI
function validateContest(userSelectedObject, CPUSelectedObject) {
  let winnerOrDraw;
  if (userSelectedObject.name === CPUSelectedObject.name) {
    winnerOrDraw = "Draw";
    return winnerOrDraw;
  };

  winnerOrDraw = userSelectedObject.beats.includes(CPUSelectedObject.name) ? "You win" : "You Lose";

  return winnerOrDraw;
}

//function to display the result on UI
function displayResult(parentElement, winnerOrDraw) {
  const resultInfo = document.createElement("div");
  resultInfo.classList.add("result-info", "grid", "margin-inline-auto");

  const winnerInfo = document.createElement("span");
  winnerInfo.classList.add("winner-info", "uppercase");
  winnerInfo.textContent = winnerOrDraw;

  const playAgainBtn = document.createElement("button");
  playAgainBtn.classList.add("play-again-btn", "uppercase");
  playAgainBtn.textContent = "Play Again";
  playAgainBtn.addEventListener("click", createNewContest);

  [winnerInfo, playAgainBtn].forEach(elements => resultInfo.appendChild(elements));

  parentElement.appendChild(resultInfo);
}

//function to create the new contest
function createNewContest() {
  Array.from(gameWindowWrapper.children).filter((childElement) => childElement !== pentagonFigureWrapper).forEach(childElement => childElement.remove());

  pentagonFigureWrapper.style.display = "block";
}

