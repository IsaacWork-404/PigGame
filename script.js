'use strict';

const diceEl = document.querySelector('.dice');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const livePlayer = document.querySelector('.player--active');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNewEl = document.querySelector('.btn--new');

document.querySelector(`player--${activePlayer}`).classList.add('.winner')

// starting conditions
diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;
let playing = true;
let activePlayer = 0;
let scores = [0,0];
let currentScore = 0;

// rolling dice functionality
btnRollEl.addEventListener('click', function(){
    if(playing){
        //1. generating a random dice roll
        const dice = Math.trunc(Math.random()*6)+1;
        //2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        // 3. check for rolled 1: if true, switch players
        if(dice !== 1) {
            // add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            //  current0El.textContent = currentScore
        } else {
            // switch to other player
            switchPlayer();
        };
    };
});

// switch players functionality
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; //condition ? valueIfTrue : valueIfFalse
};

// hold button functionality
btnHoldEl.addEventListener('click', function(){
    if(playing){
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore
        
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. Check if player's score >= 100
        if(scores[activePlayer] >= 10){
            playing = false;
            
            livePlayer.classList.add('player--winner');
            
        } else {
            switchPlayer();
        };
    };
});

// start the game over
btnNewEl.addEventListener('click', function(){
    diceEl.classList.add('hidden');
    livePlayer.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');//Not using . because that would try to add a whole new class named .player--active
    playing = true;
    activePlayer = 0;
    scores = [0,0];
    currentScore = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
});
