/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, current_score, dice, current_player, continue_game, previous_roll;

init();

function init() {
	scores = [0, 0];
	round_score = 0;
	current_player = 0;
	continue_game = true;
	previous_roll = 0;

	document.querySelector('.dice').style.display = 'none';

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
	previous_roll= 0;
	current_player = (current_player === 0) ? 1 : 0;

	// Change the active player
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (continue_game) {
		dice = Math.floor(Math.random() * 6) + 1;
	
		var diceDOM = document.querySelector('.dice');
	
		diceDOM.src = 'dice-' + dice + '.png';
		diceDOM.style.display = 'block';
	
		if (dice === 1) {
			nextPlayer();
		} else if (dice === 6 && previous_roll === 6) {
			scores[current_player] = 0;
			document.getElementById('score-' + current_player).textContent = scores[current_player];
			nextPlayer();
		} else {
			round_score += dice
			document.getElementById('current-' + current_player).textContent = round_score;
			previous_roll = dice;
		}
	}

});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (continue_game) {
		scores[current_player] += round_score;
	
		document.getElementById('score-' + current_player).textContent = scores[current_player];
	
		if (scores[current_player] >= 30) {
			document.getElementById('name-' + current_player).textContent = 'Winner!';
	
			document.querySelector('.dice').style.display = 'none';
	
			document.querySelector('.player-' + current_player +'-panel').classList.add('winner');
			document.querySelector('.player-' + current_player +'-panel').classList.remove('active');

			continue_game = false;
		} else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

/*
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

