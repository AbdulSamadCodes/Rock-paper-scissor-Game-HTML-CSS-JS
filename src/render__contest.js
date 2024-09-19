import { GameOption,renderGameOption } from "./render_game_options.js";

const gameWindowWrapper = document.querySelector("[data-dame-window-wrapper]");
const pentagonFigureWrapper = document.querySelector("[data-pentagon-figure-wrapper]");

//function to handle the contest creation
function handleContestCreation() {
  pentagonFigureWrapper.addEventListener("click",(event) => {    
    if(!(event.target.classList.contains("game-option") ||  event.target.parentElement.matches(".game-option"))) return;

    const userSelectedOption = event.target.classList.contains("game-option") ? event.target : event.target.parentElement ;

    handleContest(userSelectedOption.dataset.option);
  });
}

handleContestCreation();

// function to remove the previous states of game from UI
const removeGameState = state => state.remove();

//function to handle the contest
function handleContest(userSelectedOption) {
  removeGameState(pentagonFigureWrapper);

  const contestOptionsContainer = document.createElement("div");
  contestOptionsContainer.classList.add("contest-options-container", "flex", "align-items-center", "justify-content-between");

  //shadow documnent fragment
  const contestFragment = document.createDocumentFragment();

  const userOptionWrapper = document.createElement("div");
  const CPUOptionWrapper = document.createElement("div");

  [userOptionWrapper, CPUOptionWrapper].forEach((optionWrapper) => {
    optionWrapper.classList.add("option-wrapper", "flex","justify-content-center","align-items-center");

    const wrapperText = document.createElement("p");
    wrapperText.classList.add("option__wrapper-text", "uppercase");
    optionWrapper.appendChild(wrapperText);

    contestOptionsContainer.appendChild(optionWrapper);
  })

  const userOptionContainer = document.createElement("span");
  const CPUOptionContainer = document.createElement("span");

  [userOptionContainer, CPUOptionContainer].forEach((optionContainer,index) => {
    optionContainer.classList.add("option-container");
  });

  userOptionWrapper.querySelector(".option__wrapper-text").textContent = "You Picked";
  userOptionWrapper.appendChild(userOptionContainer);

  CPUOptionWrapper.querySelector(".option__wrapper-text").textContent = "The House Picked";
  CPUOptionWrapper.appendChild(CPUOptionContainer);

  contestFragment.appendChild(contestOptionsContainer);
  gameWindowWrapper.appendChild(contestFragment);    

  displayUserOption(userSelectedOption,userOptionContainer);
  
  setTimeout(displayCPUOption,2000,CPUOptionContainer);
}

//function to dislay the user selected option on contest window
function displayUserOption(userOption,optionContainer){
  const userSelectedOption = gameOptions.find((gameOption) => gameOption.name === userOption);

  renderGameOption(optionContainer,userSelectedOption.name,userSelectedOption.metaData.imgSrc);
}

//function to dislay the random CPU selected option on contest window
function displayCPUOption(optionContainer) {
  const totalGameOptions = gameOptions.length;

  const CPUSelectedIndex = Math.floor(Math.random() * totalGameOptions);
  const CPUSelectedOption = gameOptions[CPUSelectedIndex];

  renderGameOption(optionContainer,CPUSelectedOption.name,CPUSelectedOption.metaData.imgSrc);
}

