"use strict";

////////////////////////////////////////
//// SELECTING ELEMENTS
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0EL = document.getElementById("score--0");
const score1EL = document.getElementById("score--1");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// starting conditions
let scores, currentScore, activePlayer, gameIsOn; // declared so they can be accessed outside of the function (globally)

// functions
const init = function () {
  // starting conditions
  scores = [0, 0]; // total scores
  currentScore = 0; // current scores per round
  activePlayer = 0; // 0 = player 1, 1 = player 2
  gameIsOn = true; // game is on or off

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add("hidden"); // hide dice until game starts
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  //// OLD ACTIVE PLAYER CHANGES
  // reset current score html element to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // change highlight to show active player
  player0EL.classList.toggle("player--active"); // remove if the class is already there and if not then add it
  player1EL.classList.toggle("player--active");

  //// CURRENT ACTIVE PLAYER CHANGES
  // switch active player
  activePlayer = activePlayer === 0 ? 1 : 0;

  // reset current score to 0
  currentScore = 0;
};

////////////////////////////////////////
//// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener("click", function (event) {
  if (gameIsOn) {
    // generate random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;
    console.warn(`Dice Roll: ${dice}`); // DEBUGGING

    // check for rolled 1: if true
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      console.warn(`Current Score: ${currentScore}`); // DEBUGGING
    } else {
      switchPlayer(); // switch to next player

      console.warn(`New Actice Player:${activePlayer}`); // DEBUGGING
    }
  }
});

////////////////////////////////////////
//// HOLD CURRENT SCORE AND CHECK FOR WINNER
btnHold.addEventListener("click", function (event) {
  if (gameIsOn) {
    // add current score to active player's total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if score is greater >= 100
    // finish game
    if (scores[activePlayer] >= 100) {
      gameIsOn = false; // stop game
      diceEL.classList.add("hidden"); // remove dice from screen
      console.log(`Player Wins!`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("active--player");
      // if not - switch to next player
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
