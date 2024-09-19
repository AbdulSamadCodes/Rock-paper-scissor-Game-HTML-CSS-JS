const gameWindow = document.querySelector("[data-game-window]");

class GameOption {
  constructor(optionName,imgSrc) {
    this.gameOption = document.createElement("button");
    this.gameOption.classList.add("game-option","grid","place-items-center","absolute");
    this.gameOption.dataset.option = optionName;

    this.imgSrc = imgSrc;
  }

  appendOptionImage() {
    this.optionImg = document.createElement("img");
    this.optionImg.loading = "lazy";
    this.optionImg.src = this.imgSrc;
    
    this.gameOption.appendChild(this.optionImg);
  }

  getGameOption() {
     this.appendOptionImage()
     return this.gameOption;
  }
}

//function to render the game option
function renderGameOption(parentElement = document, optionName ,imgSrc) {
  const gameOption = new GameOption(optionName,imgSrc).getGameOption();
  parentElement.appendChild(gameOption);
} 

//function to render the game options at the first step
function renderFirstStepGameOptions() {
  const pentagonFigure = gameWindow.querySelector("[data-pentagon-figure]");

  gameOptions.forEach((gameOption) => {
     renderGameOption(pentagonFigure,gameOption.name,gameOption.metaData.imgSrc);      
  });  
}

renderFirstStepGameOptions();