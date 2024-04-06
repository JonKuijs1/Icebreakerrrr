    let secretWord = '';
    let displayedWord = [];
    let guessedLetters = [];
    let mistakes = 0;
    const maxMistakes = 6;  




    function submitWord() {
        secretWord = document.getElementById('wordToGuess').value.toUpperCase();
        document.getElementById('wordToGuess').value = ''; // Clear input field
        document.getElementById('wordSubmissionSection').style.display = 'none';
        document.getElementById('gameSection').style.display = 'block';
        displayedWord = Array(secretWord.length).fill('_');
        updateWordDisplay();
        
        // Set the initial hangman image based on the secret word
        updateHangmanImage(); // This call ensures the correct initial image is set
    }


    function submitLetter() {
        const letter = document.getElementById('letterInput').value.toUpperCase();
        document.getElementById('letterInput').value = ''; // Clear input field
        
        // Check if the letter has already been guessed or if the input is empty
        if (guessedLetters.includes(letter) || letter === '') {
            // Optionally, alert the player or update the UI to indicate the letter was already guessed
            return; // Exit the function early to prevent processing the guess again
        }
        
        // Add the letter to the guessedLetters array since it's a new guess
        guessedLetters.push(letter);
        
        if (secretWord.includes(letter)) {
            for (let i = 0; i < secretWord.length; i++) {
                if (secretWord[i] === letter) {
                    displayedWord[i] = letter;
                }
            }
            updateWordDisplay();
        } else {
            // Wrong guess
            mistakes++;
            updateHangmanImage();
        }
        updateGuessedLetters();
        checkGameStatus();
    }

    function updateWordDisplay() {
        document.getElementById('wordDisplay').textContent = displayedWord.join(' ');
    }

    function updateGuessedLetters() {
        document.getElementById('lettersGuessed').textContent = `Guessed Letters: ${guessedLetters.join(', ')}`;
    }

    function updateHangmanImage() {
        // Use the easter egg images if the secret word is ICECUBE
        if (secretWord === 'ICECUBE') {
            document.getElementById('hangmanProgressImg').src = `images/hangmanspecial${mistakes}.svg`;
        } else {
            // Use the regular hangman images for other words
            document.getElementById('hangmanProgressImg').src = `images/hangman${mistakes}.svg`;
        }
    }




    function checkGameStatus() {
        if (mistakes >= maxMistakes) {
            document.getElementById('gameStatus').innerHTML = `Game Over! The word was: <strong>${secretWord}</strong>`;
            document.getElementById('letterInput').disabled = true;
        } else if (!displayedWord.includes('_')) {
            document.getElementById('gameStatus').innerHTML = `<strong>Congratulations!</strong> You guessed the word: <strong>${secretWord}</strong>`;
            document.getElementById('letterInput').disabled = true;
        }
    }


    function checkGameStatus() {
        if (mistakes >= maxMistakes) {
            document.getElementById('gameStatus').innerHTML = `Game Over! The word was: <strong>${secretWord}</strong>`;
            document.getElementById('letterInput').disabled = true;
        } else if (!displayedWord.includes('_')) {
            document.getElementById('gameStatus').innerHTML = `<strong>Congratulations!</strong> You guessed the word: <strong>${secretWord}</strong>`;
            document.getElementById('letterInput').disabled = true;
        }
        if (mistakes >= maxMistakes || !displayedWord.includes('_')) {
            document.getElementById('restartButton').style.display = 'block'; // Show the restart button
        }
    }

    function resetGame() {
        secretWord = 'ICECUBE';
        displayedWord = [];
        guessedLetters = [];
        mistakes = 0;
        
        document.getElementById('gameStatus').innerHTML = '';
        document.getElementById('lettersGuessed').textContent = '';
        
        // This line resets the image to the default starting image
        // It should be conditionally changed if you want a special starting image for "ICECUBE"
        document.getElementById('hangmanProgressImg').src = 'images/hangman0.svg';
        
        document.getElementById('letterInput').disabled = false;
        document.getElementById('restartButton').style.display = 'none';
        document.getElementById('wordSubmissionSection').style.display = 'block';
        document.getElementById('gameSection').style.display = 'none';
    }

    // Animate script

    document.addEventListener('DOMContentLoaded', function() {
        const excludeImageNames = ['images/hangman6.svg', 'images/hangmanspecial6.svg']; // Correct variable name
        const svgImages = document.querySelectorAll('.animate-svg');
    
        let speed = 2000; // Speed in milliseconds
        const maxHeight = 30; // Maximum vertical movement allowed
    
        // Corrected function to update speed and check against all excluded image names
        function updateSpeed(newSpeed) {
        svgImages.forEach(svgImage => {
            let shouldExclude = excludeImageNames.some(excludeImageName => svgImage.src.includes(excludeImageName));
            if (!shouldExclude) { // Check against all items in excludeImageNames
            svgImage.style.transitionDuration = `${newSpeed}ms`;
            }
        });
        speed = newSpeed;
        }
    
        // Corrected function to move SVG and check against all excluded image names
        function moveSVG() {
        svgImages.forEach(svgImage => {
            let shouldExclude = excludeImageNames.some(excludeImageName => svgImage.src.includes(excludeImageName));
            if (!shouldExclude) { // Check against all items in excludeImageNames
            const deltaX = Math.random() * 30 - 10; // Move left or right up to 20px
            const deltaY = Math.min(Math.max(Math.random() * 30 - 10, -maxHeight), maxHeight); // Ensure deltaY doesn't exceed maxHeight
            svgImage.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            }
        });
        }
    
        // Initial speed setup for elements except the excluded images
        updateSpeed(speed);
    
        setInterval(moveSVG, speed);
    });

    