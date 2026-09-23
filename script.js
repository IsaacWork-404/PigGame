'use strict';

const diceEl = document.querySelector('.dice');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNewEl = document.querySelector('.btn--new');

// starting conditions
diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;

let playing = true;
let activePlayer = 0;
let currentScore = 0;

// closure
const createScoreManager = function () {
  let score = 0;

  return {
    add: function (points) {
      score += points;
    },

    get: function () {
      return score;
    },

    reset: function () {
      score = 0;
    },
  };
};

// each player gets their own closure
const playerScores = [createScoreManager(), createScoreManager()];

// resetting both players with recursion
const resetPlayers = function (playerIndex) {
  if (playerIndex > 1) return; // base case

  playerScores[playerIndex].reset();

  document.getElementById(`score--${playerIndex}`).textContent =
    playerScores[playerIndex].get();

  document.getElementById(`current--${playerIndex}`).textContent = 0;

  resetPlayers(playerIndex + 1); // recursive call
};

// switch players functionality
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  currentScore = 0;
  diceEl.classList.add('hidden');

  activePlayer = activePlayer === 0 ? 1 : 0;
};

// rolling dice functionality
btnRollEl.addEventListener('click', function () {
  if (playing) {
    // 1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1: if true, switch players
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;

      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // switch to other player
      switchPlayer();
    }
  }
});

// hold button functionality
btnHoldEl.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    playerScores[activePlayer].add(currentScore);

    document.getElementById(
      `score--${activePlayer}`
    ).textContent = playerScores[activePlayer].get();

    // 2. Check if player's score >= 100
    if (playerScores[activePlayer].get() >= 100) {
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

// start the game over
btnNewEl.addEventListener('click', function () {
  diceEl.classList.add('hidden');

  // remove winner styling from both players
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  playing = true;
  activePlayer = 0;
  currentScore = 0;

  resetPlayers(0);
});