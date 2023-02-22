let btns = document.querySelectorAll("li button");
const winCombination = [
  { name: "rock", defeats: "scissors" },
  { name: "scissors", defeats: "paper" },
  { name: "paper", defeats: "rock" },
];

let playerChoice;
let computerChoice;
let btnReset;
// Helper function
const getRandomInt = (max) => Math.floor(Math.random() * max + 1);
// getting Compuer Choice
const getCmpChoice = function () {
  const num = getRandomInt(3);
  if (num === 1) computerChoice = "rock";
  if (num === 2) computerChoice = "paper";
  if (num === 3) computerChoice = "scissors";
};

const checkResult = function () {
  let res;
  if (playerChoice === computerChoice) return "Game draw";

  for (let i = 0; i < winCombination.length; i++) {
    if (
      winCombination[i].name === playerChoice &&
      winCombination[i].defeats === computerChoice
    ) {
      res = "you-wins";
    }
    if (
      (winCombination[i].name === playerChoice &&
        winCombination[i].defeats !== computerChoice) ||
      (winCombination[i].name !== playerChoice &&
        winCombination[i].defeats === computerChoice)
    ) {
      res = "computer-wins";
    }
  }
  return res;
};

const reset = function () {
  btnReset.addEventListener("click", function () {
    const markup = `
    <div class="wrapper">
    <h1>pick one</h1>
    <ul>
      <li class="pick-one">
        <button>
          <img src="./images/rock.png" alt="Rock" />
          rock
        </button>
      </li>
      <li class="pick-one">
        <button>
          <img src="./images/paper.png" alt="Paper" />
          paper
        </button>
      </li>
      <li class="pick-one">
        <button>
          <img src="./images/scissors.png" alt="Scissors" />
          scissors
        </button>
      </li>
    </ul>
  </div>
    `;
    document.body.innerHTML = markup;
    document.body.classList.remove("you-wins");
    document.body.classList.remove("computer-wins");
    document.body.classList.remove("winner");
    // resetting variables
    playerChoice = "";
    computerChoice = "";
    btns = document.querySelectorAll("li button");
    init(btns);
  });
  //   init();
};

const displayResult = function () {
  const res = checkResult();
  if (playerChoice === computerChoice) {
    const markup = `
    <div class="draw">
          <p>⚡ Battle Draw ⚡</p>
    </div>
     <button class="play-again m-b">play again?</button>
      `;
    document.body.innerHTML = markup;
    btnReset = document.querySelector(".play-again");

    return;
  }
  //   console.log(res);
  const markup = `
  <div class="wrapper">
  <div class="your-pick">
    <h1 class="you-win">you win</h1>
    <img src="./images/${playerChoice}.png" alt="${computerChoice}" />
  </div>
  <div class="computer-pick">
    <h1 class="computer-wins">computer wins</h1>
    <img src="./images/${computerChoice}.png" alt="${computerChoice}" />
   </div>
   <button class="play-again">play again?</button>
    `;
  document.body.classList.remove("you-wins");
  document.body.classList.remove("computer-wins");
  document.body.classList.add(res);
  document.body.classList.add("winner");
  document.body.innerHTML = markup;
  btnReset = document.querySelector(".play-again");
  // adding reset
};

function init(btns) {
  btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // Getting Player choice from UI
      playerChoice = e.target
        .closest("button")
        .querySelector("img")
        .getAttribute("alt")
        .toLowerCase();
      // getting Compuer Choice
      getCmpChoice();
      //displaying result
      displayResult();
      // setting handler to play again button
      reset();
    });
  });
}
init(btns);
