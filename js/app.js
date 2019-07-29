let min = 1,
		max = 10,
		winningNum = getRandomNum(min, max),
		guessesLeft = 3;

const game = document.getElementById('game'),
			minNum = document.querySelector('.min-num'),
			maxNum = document.querySelector('.max-num'),
			guessBtn = document.getElementById('guess-btn'),
			guessInput = document.getElementById('guess-input'),
			message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

guessBtn.addEventListener('click', function() {
	let guess = parseInt(guessInput.value);

	if(isNaN(guess) || guess < min || guess > max) {
		setMessage(`Введи, пожалуйста, цифры от ${min} до ${max}`, 'pink');
	}

	if(guess === winningNum) {
		gameOver(true, `Ты угадал! Это ${winningNum}! =)`);
	} else {
		guessesLeft -= 1;

		if(guessesLeft === 0) {
			gameOver(false, `Игра окончена =(. Загаданным числом было число ${winningNum}.`)
		} else {
			guessInput.style.borderColor = 'pink';
			guessInput.value = '';
			setMessage(`Неправильно. Осталось попыток: ${guessesLeft}.`, 'pink')
		}
	}
});

game.addEventListener('mousedown', function(e) {
	if(e.target.className === 'game-box__input-btn general-input-style play-again') {
		window.location.reload();
	}
});

function getRandomNum() {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}

function gameOver(won, msg) {
	let color;
	won === true ? color = 'lightgreen' : color = 'pink';

	guessInput.disabled = true;
	guessInput.style.borderColor = color;
	message.style.color = color;

	setMessage(msg);

	guessBtn.value = 'Играть еще';
	guessBtn.classList.add('play-again');

}