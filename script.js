'use strict';
const diceImages = [];
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const diceImage = document.getElementsByClassName('dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
let score0 = 0;
let score1 = 0;
const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

score0El.textContent = score0;
score1El.textContent = score1;
diceImage[0].classList.add('hidden');
setUpImagesArray();

rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdPressed);
newBtn.addEventListener('click', startNewGame);

function setUpImagesArray() {
  for (let i = 1; i <= 6; i++) {
    diceImages.push(`dice-${i}.png`);
  }
}
console.log(diceImages);

function rollDice() {
  if (playing) {
    const diceRollRandom = Math.floor(Math.random() * 6) + 1;
    console.log(diceRollRandom);
    diceImage[0].setAttribute('src', `dice-${diceRollRandom}.png`);
    diceImage[0].classList.remove('hidden');
    if (diceRollRandom !== 1) {
      currentScore += diceRollRandom;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
}

function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  //switchPlayer();

  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  if (player1.classList.contains('player--active')) {
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
  } else {
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
  }
  currentScore = 0;
}

function holdPressed() {
  if (playing) {
    if (activePlayer === 0) {
      score0 += currentScore;
      if (score0 >= 100) {
        player1.classList.add('player--winner', 'name');
        playing = false;
      }
      score0El.textContent = score0;
      switchPlayer();
    } else {
      score1 += currentScore;
      score1El.textContent = score1;
      if (score1 >= 100) {
        player2.classList.add('player--winner');
        playing = false;
      }
      switchPlayer();
    }
  }
}

function startNewGame() {
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  if (activePlayer === 1) {
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
  }
  activePlayer = 0;
  currentScore = 0;
  score0 = 0;
  score0El.textContent = score0;
  score1 = 0;
  score1El.textContent = score0;
  currentScore0El.textContent = currentScore;
  currentScore1El.textContent = currentScore;
  playing = true;
}
