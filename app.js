let globalScores = [0,0];
let roundScore = 0;
let isPlayerOne = true;
const maxGameScore = 50;

document.querySelector('.btn-new').addEventListener('click', function() {
  globalScores = [0,0];
  roundScore = 0;
  document.querySelector('.dice-image').style.display = 'none';
  const winnerDOM = document.querySelector('.winner');
  if (winnerDOM) {
    resetWinnerView(winnerDOM);
  }
  updateActivePlayer(true); //reset to player one
  resetMessages();
  resetScores();
})

function resetWinnerView(winnerDOM) {
  winnerDOM.classList.remove('winner');
  document.querySelector('.player-one-crown').style.visibility = 'hidden';
  document.querySelector('.player-two-crown').style.visibility = 'hidden';
  document.querySelector('.btn-roll').disabled = false;
  document.querySelector('.btn-hold').disabled = false;
}

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
  const currentPlayerGlobalScoreID = isPlayerOne ? '#player-one-globalscore' : '#player-two-globalscore';
  setGlobalScoreForPlayer(currentPlayerGlobalScoreID, isPlayerOne);

  const isWinner = globalScores[+isPlayerOne] >= maxGameScore;
  if (isWinner) { //if user has won
    updateWinnerView();
  } else {
    updateActivePlayer(!isPlayerOne);
  }
})

function setGlobalScoreForPlayer(currentPlayerGlobalScoreID, isPlayerOne) {
  globalScores[+isPlayerOne] = globalScores[+isPlayerOne] + roundScore; //implicit casting true/false value
  document.querySelector(currentPlayerGlobalScoreID).innerHTML = globalScores[+isPlayerOne];
}

function updateWinnerView() {
  resetMessages();
  document.querySelector('.player-moves').classList.add('winner');
  document.querySelector('.btn-roll').disabled = true;
  document.querySelector('.btn-hold').disabled = true;
  isPlayerOne ? (document.querySelector('.player-one-crown').style.visibility = 'visible') :
  (document.querySelector('.player-two-crown').style.visibility = 'visible');
  document.querySelector('.result-winner').style.display = 'block';
}

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
    updateActivePlayer(!isPlayerOne);
  }
}

function updateActivePlayer(_isPlayerOne) {
  isPlayerOne = _isPlayerOne;
  roundScore = 0;
  const currentPlayerRoundScore = isPlayerOne ? '#player-one-roundscore' : '#player-two-roundscore';
  document.querySelector(currentPlayerRoundScore).innerHTML = roundScore;
  document.querySelector('.is-active').classList.remove('is-active');

  isPlayerOne ? document.querySelector('.player-one').classList.add('is-active') :
    document.querySelector('.player-two').classList.add('is-active')
}
