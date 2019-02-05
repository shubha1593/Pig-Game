/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, current_score, dice_1, dice_2, current_player, continue_game, previous_roll, winning_score;

init();

function init() {
	scores = [0, 0];
	round_score = 0;
	current_player = 0;
	continue_game = true;
	winning_score = document.getElementById('winning-score').value;

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	for (var i = 0; i < 2; i++) {
		// Reset every score to 0
		document.getElementById('score-' + i).textContent = '0';
		document.getElementById('current-' + i).textContent = '0';
	
		document.getElementById('name-' + i).textContent = 'Player ' + i;

		document.querySelector('.player-' + i +'-panel').classList.remove('winner');
		document.querySelector('.player-' + i +'-panel').classList.remove('active');
	}
	document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
	// Reset the current score of the current player
	document.getElementById('current-' + current_player).textContent = '0';
	// Reset round score
	round_score = 0;
	current_player = (current_player === 0) ? 1 : 0;

	// Change the active player
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (continue_game) {
		dice_1 = Math.floor(Math.random() * 6) + 1;
		dice_2 = Math.floor(Math.random() * 6) + 1;

		var diceDOM_1 = document.getElementById('dice-1');
		var diceDOM_2 = document.getElementById('dice-2');

		diceDOM_1.src = 'dice-' + dice_1 + '.png';
		diceDOM_2.src = 'dice-' + dice_2 + '.png';

		diceDOM_1.style.display = 'block';
		diceDOM_2.style.display = 'block';

		if (dice_1 === 1 || dice_2 === 1) {
			nextPlayer();
		} else if (dice_1 === 6 && dice_2 === 6) {
			scores[current_player] = 0;
			document.getElementById('score-' + current_player).textContent = scores[current_player];
			nextPlayer();
		} else {
			round_score += dice_1 + dice_2;
			document.getElementById('current-' + current_player).textContent = round_score;
		}
	}

});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (continue_game) {
		scores[current_player] += round_score;
	
		document.getElementById('score-' + current_player).textContent = scores[current_player];
	
		if (scores[current_player] >= winning_score) {
			document.getElementById('name-' + current_player).textContent = 'Winner!';
	
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
	
			document.querySelector('.player-' + current_player +'-panel').classList.add('winner');
			document.querySelector('.player-' + current_player +'-panel').classList.remove('active');

			continue_game = false;
		} else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);
