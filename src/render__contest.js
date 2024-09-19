const gameWindowWrapper = document.querySelector("[data-dame-window-wrapper]");
const pentagonFigureWrapper = document.querySelector("[data-pentagon-figure-wrapper]");

// function to remove the previous states of game from UI
const removeGameState = state => state.remove();

//function to create  the  contest window
function createContestWindow() {
  removeGameState(pentagonFigureWrapper);

  const contestOptionsContainer = document.createElement("div");
  contestOptionsContainer.classList.add("contest-options-container", "flex", "align-items-center", "justify-content-between");

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

  [userOptionContainer, CPUOptionContainer].forEach((optionContainer) => {
    optionContainer.classList.add("option-container");
  });

  userOptionWrapper.querySelector(".option__wrapper-text").textContent = "You Picked";
  userOptionWrapper.appendChild(userOptionContainer);

  CPUOptionWrapper.querySelector(".option__wrapper-text").textContent = "The House Picked";
  CPUOptionWrapper.appendChild(CPUOptionContainer);

  gameWindowWrapper.appendChild(contestOptionsContainer);    
}

createContestWindow();
