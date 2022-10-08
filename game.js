// Definition of parameters
const min = 1;
let max = 2;
let stage = 1;
let playerPoints = 0;
let numberOfAttempts = 1;

const numberOfChances = 3;

// --> Prompt a user for the username
let userName = prompt("Username:");

function endGame() {
	alert(
		`${
			userName ? capitalizedUserName : "Player1"
		}, you have chosen to end the game. \nYou had ${playerPoints} ${
			playerPoints > 1 ? "points" : "point"
		} \nTo restart, refresh the window`
	);
	return;
}

// --> if the user choose not to imput a username and decides to cancel the game
if (userName === null) {
	endGame();
}

// --> if the user keeps on pressing "OK" without inputting a username, the while statement runs
while (userName === "") {
	alert("Please input a user name");
	userName = prompt("Username:");
	// ---> if after pressing pressing "OK" without providing the required data, the user decides to quit the game:
	if (userName === null) {
		endGame();
	}
}

// --> format(capitalize) the username inputted by the user.
let capitalizedUserName = "Player";
if (userName) {
	capitalizedUserName = userName.charAt(0).toUpperCase() + userName.slice(1);
}

// const correctAnswer = Math.floor(Math.random() * max) + min;

// --> function to start the game
function startGame() {
	// --> Ask for the player's guess
	let guess = prompt(`WELCOME TO STAGE ${stage}
        \nGuess a number between ${min} and ${max}. Your guess is:`);

	// --> conveert the player guess to a number
	let formattedGuess = Number(guess);

	// --> If the player chooses to cancel, end the game
	if (guess === null) {
		endGame();
	}

	if (guess === "") {
		outer: while (guess === "") {
			alert("Please input a guess");
			guess = prompt(`WELCOME TO STAGE ${stage}
        \nGuess a number between ${min} and ${max}. Your guess is:`);
			if (guess !== "") {
				break outer;
			}
		}
	}

	if (isNaN(formattedGuess)) {
		outer: while (isNaN(formattedGuess)) {
			alert("only numbers are valid guesses");
			guess = prompt(`WELCOME TO STAGE ${stage}
        \nGuess a number between ${min} and ${max}. Your guess is:`);
			if (Number(guess)) {
				break outer;
			}
		}
	}

	// -->Genarate a number between range of min and max
	const correctAnswer = Math.floor(Math.random() * max) + min;

	// ---> while the player has not guessed the correct answer and has more than 0 tries
	while (
		guess !== null &&
		formattedGuess !== correctAnswer &&
		numberOfAttempts < numberOfChances
	) {
		// -->alert the player that they are incorrect and have x number of tries left1
		alert(
			`Nope, That's not it, Try again, you have ${
				numberOfChances - numberOfAttempts
			} ${numberOfChances - numberOfAttempts > 1 ? "tries" : "try"} left`
		);

		// --> if the player guesses incorrectly, increase the number of attempts by 1
		numberOfAttempts += 1;
		guess = prompt("Guess again: ");
		if (guess === null) {
			endGame();
		}
		formattedGuess = Number(guess);
	}

	// --> if the player runs out of chances and did not guess correctly
	if (
		formattedGuess !== correctAnswer &&
		numberOfAttempts === numberOfChances
	) {
		alert(
			` ${capitalizedUserName}, too bad you could not find it, the answer was ${correctAnswer}`
		);
	}

	// --> if the player guesses correctly
	if (formattedGuess === correctAnswer) {
		stage += 1;
		playerPoints += 1;

		alert(
			`Good job ${capitalizedUserName}, you got it in ${numberOfAttempts} ${
				numberOfAttempts > 1 ? "tries" : "try"
			}.
            \n You have ${playerPoints} ${playerPoints > 1 ? "points" : "point"}
            `
		);

		let continueGame = confirm(
			`Would you like to continue to stage ${stage}? `
		);
		if (continueGame) {
			max += 1;
			numberOfAttempts = 1;
			startGame();
		} else {
			endGame();
		}
	}
}

// ---> start the game
if (userName) {
	startGame();
}
