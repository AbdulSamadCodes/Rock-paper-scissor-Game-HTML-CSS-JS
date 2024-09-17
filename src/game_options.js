//All the different game options
const gameOptions = [
  {
    name: "rock",
    beats: ["scissors", "lizard"],

    metaData: {
      imgSrc: "/images/icon-rock.svg",
    }
  },
  {
    name: "paper",
    beats: ["rock", "spock"],

    metaData: {
      imgSrc: "/images/icon-paper.svg",
    }
  },
  {
    name: "scissors",
    beats: ["papers", "lizard"],

    metaData: {
      imgSrc: "/images/icon-scissors.svg",
    }
  },
  {
    name: "spock",
    beats: ["rock", "scissors"],

    metaData: {
      imgSrc: "/images/icon-spock.svg",
    }
  },
  {
    name: "lizard",
    beats: ["spock", "paper"],

    metaData: {
      imgSrc: "/images/icon-lizard.svg",
    }
  }
];
