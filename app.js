let globalScores = [0,0];
let roundScore = 0;
let isPlayerOne = true;
const maxGameScore = 50;

document.querySelector('.btn-new').addEventListener('click', function() {
  globalScores = [0,0];
  roundScore = 0;
  document.querySelector('.dice-image').style.display = 'none';
  document.querySelector('.btn-roll').disabled = false;
  document.querySelector('.btn-hold').disabled = false;
  document.querySelector('.player-one-crown').style.visibility = 'hidden';
  document.querySelector('.player-two-crown').style.visibility = 'hidden';

  const winnerDOM = document.querySelector('.winner');
  if (winnerDOM) {
    winnerDOM.classList.remove('winner');
  }
  changePlayer(true);
  resetMessages();
  resetScores();
})

function resetMessages() {
  document.querySelector('.result-showdiceresult').style.display = 'none';
  document.querySelector('.result-roundlost').style.display = 'none';
  document.querySelector('.result-holdresult').style.display = 'none';
  document.querySelector('.result-winner').style.display = 'none';
}

function resetScores() {
  document.querySelector('#player-one-globalscore').innerHTML = globalScores[0];
  document.querySelector('#player-two-globalscore').innerHTML = globalScores[0];
  document.querySelector('#player-one-roundscore').innerHTML = roundScore;
  document.querySelector('#player-two-roundscore').innerHTML = roundScore;
}

document.querySelector('.btn-hold').addEventListener('click', function() {
  resetMessages();
  document.querySelector('.result-holdresult').style.display = 'block';
  const currentPlayerGlobalScore = isPlayerOne ? '#player-one-globalscore' : '#player-two-globalscore';

  globalScores[+isPlayerOne] = globalScores[+isPlayerOne] + roundScore; //implicit casting true/false value
  document.querySelector(currentPlayerGlobalScore).innerHTML = globalScores[+isPlayerOne];

  if (globalScores[+isPlayerOne] >= maxGameScore) { //if user has won
    resetMessages();
    document.querySelector('.player-moves').classList.add('winner');
    document.querySelector('.btn-roll').disabled = true;
    document.querySelector('.btn-hold').disabled = true;
    isPlayerOne ? (document.querySelector('.player-one-crown').style.visibility = 'visible') :
    (document.querySelector('.player-two-crown').style.visibility = 'visible');
    document.querySelector('.result-winner').style.display = 'block';
  } else {
    changePlayer(false);
  }
})

document.querySelector('.btn-roll').addEventListener('click', function() {
  resetMessages();
  const diceResult = Math.floor(Math.random() * 6) + 1;
  updateDiceImage(diceResult);
  updateDiceMessage(diceResult);
})

function updateDiceImage(diceResult) {
  const diceDOM = document.querySelector('.dice-image');
  diceDOM.src = 'images/dice-' + diceResult + '.png';
  diceDOM.style.display = 'block';
}

function updateDiceMessage(diceResult) {
  const showDiceResultDOM = document.querySelector('.result-showdiceresult');
  const roundScoreLostDOM = document.querySelector('.result-roundlost');
  const currentPlayerRoundScore = isPlayerOne ? '#player-one-roundscore' : '#player-two-roundscore';
  resetMessages();

  if(diceResult > 1) {
    showDiceResultDOM.innerHTML = 'Dice rolled! +' + diceResult +' points';
    showDiceResultDOM.style.display = 'block';
    roundScore = roundScore + diceResult;
    document.querySelector(currentPlayerRoundScore).innerHTML = roundScore;
  } else {
    roundScoreLostDOM.style.display = 'block';
    roundScore = 0;
    document.querySelector(currentPlayerRoundScore).innerHTML = roundScore;
    changePlayer(false);
  }
}

function changePlayer(forcePlayerOne) {
  isPlayerOne = forcePlayerOne ? true : !isPlayerOne;
  roundScore = 0;
  const currentPlayerRoundScore = isPlayerOne ? '#player-one-roundscore' : '#player-two-roundscore';
  document.querySelector(currentPlayerRoundScore).innerHTML = roundScore;
  document.querySelector('.is-active').classList.remove('is-active');

  isPlayerOne ? document.querySelector('.player-one').classList.add('is-active') :
    document.querySelector('.player-two').classList.add('is-active')
}
