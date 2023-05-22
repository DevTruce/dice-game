"use strict";

////////////////////////////////////////
//// STASHING ELEMENTS
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

////////////////////////////////////////
//// STARTING CONDITIONS
let scores, currentScore, activePlayer, gameIsOn; // declared so they can be accessed outside of the function (globally)

////////////////////////////////////////
//// FUNCTIONS
// GAME STARTING CONDITIONS
const init = function () {
  scores = [0, 0]; // total scores for each player
  currentScore = 0; // current score of the active player (per round)
  activePlayer = 0; // 0 = player 1, 1 = player 2
  gameIsOn = true; // game is on or off

  score0EL.textContent = 0; // change total score html element to 0
  score1EL.textContent = 0;
  current0EL.textContent = 0; // change current score html element to 0
  current1EL.textContent = 0;

  diceEL.classList.add("hidden"); // hide dice until game starts
  player0EL.classList.remove("player--winner"); // remove winner class
  player1EL.classList.remove("player--winner"); // remove winner class
  player0EL.classList.add("player--active"); // add active class to player 0
  player1EL.classList.remove("player--active"); // remove active class from player 1
};

init(); // call init function on page load

// SWITCH THE ACTIVE PLAYER
const switchPlayer = function () {
  // RESET CURRENT SCORE HTML ELEMENT FOR PREVIOUS PLAYER
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // CHANGE HIGHLIGHT TO DISPLAY OVER THE ACTIVE PLAYER
  player0EL.classList.toggle("player--active"); // remove if the class is already there and if not then add it
  player1EL.classList.toggle("player--active");

  // SWITCH THE ACTIVE PLAYER
  activePlayer = activePlayer === 0 ? 1 : 0;

  // RESET CURRENT SCORE OF THE ACTIVE PLAYER
  currentScore = 0;
};

////////////////////////////////////////
//// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener("click", function (event) {
  //// ONLY RUN THIS CODE IF "gameIsOn" IS TRUE
  if (gameIsOn) {
    // GENERATE RANDOM DICE ROLL BETWEEN 1 AND 6
    let dice = Math.trunc(Math.random() * 6) + 1;

    // DISPLAY THE DICE
    diceEL.classList.remove("hidden"); // remove hidden class to allow dice to be displayed
    diceEL.src = `dice-${dice}.png`; // figure out which dice image to display
    console.warn(`Dice Roll: ${dice}`); // DEBUGGING

    // CHECK THE DICE ROLL RESULT
    if (dice !== 1) {
      // ADD DICE ROLL TO CURRENT SCORE
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // update current score html element

      console.warn(`Current Score: ${currentScore}`); // DEBUGGING
    } else {
      // IF DICE ROLL IS ONE THEN SWITCH THE ACTIVE PLAYER
      switchPlayer(); // switch to next player

      console.warn(`New Actice Player:${activePlayer}`); // DEBUGGING
    }
  }
});

////////////////////////////////////////
//// STORE CURRENT SCORE AND CHECK FOR WINNER
btnHold.addEventListener("click", function (event) {
  //// ONLY RUN THIS CODE IF "gameIsOn" IS TRUE
  if (gameIsOn) {
    // ADD CURRENT SCORE TO ACTIVE PLAYERS TOTAL SCORE
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // update total score html element

    ////////////////////////////////////////
    //// CHECK IF THE GAME IS OVER
    if (scores[activePlayer] >= 100) {
      // TURN GAME OFF AND REMOVE DICE FROM SCREEN
      gameIsOn = false; // stop game (DISABLE EVENT LISTENERS)
      diceEL.classList.add("hidden"); // remove dice from screen
      console.log(`Player Wins!`); // DEBUGGING

      // ASSIGN THE WINNER CLASS TO THE WINNING PLAYER
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      // REMOVE ACTIVE PLAYER CLASS FROM THE WINNING PLAYER
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("active--player");
    } else {
      // IF THE GAME IS NOT OVER THEN SWITCH THE ACTIVE PLAYER WHEN THE HOLD BUTTON IS CLICKED
      switchPlayer();
    }
  }
});

////////////////////////////////////////
//// RESTART THE GAME
btnNew.addEventListener("click", init); // reset initial variables and all changed html elements
