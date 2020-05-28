/*
* Javascript code goes here
*/

const globalScores = [0,0];
let roundScore = 0;

// return a random number between 1 and 6
// function rollDice() {

// }

// function newGame() {

// }

document.querySelector('.btn-roll').addEventListener('click', function() {
  const diceResult = Math.floor(Math.random() * 6) + 1;
  console.log('result', diceResult);

  const diceDOM = document.querySelector('.dice-image');
  diceDOM.src = 'images/dice-' + diceResult + '.png';
  diceDOM.style.display = 'block';
  
  const diceDesc = document.querySelector('.result-showdiceresult');
  diceDesc.innerHTML = 'Dice rolled! +' + diceResult +' points';
  diceDesc.style.display = 'block';

  
})
