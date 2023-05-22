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

const scores = [0, 0]; // total scores
let currentScore = 0; // current scores per round
let activePlayer = 0; // 0 = player 1, 1 = player 2

// set scores to 0
score0EL.textContent = 0;
score1EL.textContent = 0;

//

diceEL.classList.add("hidden"); // hide dice until game starts

////////////////////////////////////////
//// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener("click", function (event) {
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
    //// OLD ACTIVE PLAYER CHANGES
    // store current score into total score for last active player

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

    console.warn(`New Actice Player:${activePlayer}`); // DEBUGGING
  }
});
