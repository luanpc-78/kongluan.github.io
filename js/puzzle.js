// Export function để khởi tạo puzzle game
// Thêm logic chọn chế độ và thêm câu hỏi
export function initPuzzle(languageManager) {
    // 1. Lấy lại các phần tử DOM mỗi lần vào puzzle
    const wordDisplay = document.querySelector(".word-display");
    const guessesText = document.querySelector(".guesses-text b");
    const keyboardDiv = document.querySelector(".keyboard");
    const hangmanImage = document.querySelector(".hangman-box img");
    const gameModal = document.querySelector(".game-modal");
    const playAgainBtn = gameModal.querySelector("button");
    const lastQuestionDiv = document.querySelector('.puzzle-last-question');
    const lastAnswerSpan = document.getElementById('last-answer');
    const lastHintSpan = document.getElementById('last-hint');
    const modeSelect = document.querySelector('.puzzle-mode-select');
    const addQuestionDiv = document.querySelector('.puzzle-add-question');
    const addForm = document.getElementById('add-question-form');
    const cancelAddBtn = document.getElementById('cancel-add');
    const newWordInput = document.getElementById('new-word');
    const newHintInput = document.getElementById('new-hint');

    // 2. Reset UI
    if (keyboardDiv) keyboardDiv.innerHTML = '';
    if (wordDisplay) wordDisplay.innerHTML = '';
    if (guessesText) guessesText.innerText = '';
    if (hangmanImage) hangmanImage.src = "svg/hangman-0.svg";
    if (gameModal) gameModal.classList.remove("show");
    if (lastQuestionDiv) lastQuestionDiv.style.display = 'none';

    // 3. Khai báo biến trong hàm
    let wordList = [
        { word: "guitar", hint: "A musical instrument with strings." },
        { word: "oxygen", hint: "A colorless, odorless gas essential for life." },
        { word: "mountain", hint: "A large natural elevation of the Earth's surface." },
        { word: "painting", hint: "An art form using colors on a surface to create images or expression." },
        { word: "astronomy", hint: "The scientific study of celestial objects and phenomena." },
        { word: "football", hint: "A popular sport played with a spherical ball." },
        { word: "chocolate", hint: "A sweet treat made from cocoa beans." },
        { word: "butterfly", hint: "An insect with colorful wings and a slender body." },
        { word: "history", hint: "The study of past events and human civilization." },
        { word: "pizza", hint: "A savory dish consisting of a round, flattened base with toppings." },
        { word: "jazz", hint: "A genre of music characterized by improvisation and syncopation." },
        { word: "camera", hint: "A device used to capture and record images or videos." },
        { word: "diamond", hint: "A precious gemstone known for its brilliance and hardness." },
        { word: "adventure", hint: "An exciting or daring experience." },
        { word: "science", hint: "The systematic study of the structure and behavior of the physical and natural world." },
        { word: "bicycle", hint: "A human-powered vehicle with two wheels." },
        { word: "sunset", hint: "The daily disappearance of the sun below the horizon." },
        { word: "coffee", hint: "A popular caffeinated beverage made from roasted coffee beans." },
        { word: "dance", hint: "A rhythmic movement of the body often performed to music." },
        { word: "galaxy", hint: "A vast system of stars, gas, and dust held together by gravity." },
        { word: "orchestra", hint: "A large ensemble of musicians playing various instruments." },
        { word: "volcano", hint: "A mountain or hill with a vent through which lava, rock fragments, hot vapor, and gas are ejected." },
        { word: "novel", hint: "A long work of fiction, typically with a complex plot and characters." },
        { word: "sculpture", hint: "A three-dimensional art form created by shaping or combining materials." },
        { word: "symphony", hint: "A long musical composition for a full orchestra, typically in multiple movements." },
        { word: "architecture", hint: "The art and science of designing and constructing buildings." },
        { word: "ballet", hint: "A classical dance form characterized by precise and graceful movements." },
        { word: "astronaut", hint: "A person trained to travel and work in space." },
        { word: "waterfall", hint: "A cascade of water falling from a height." },
        { word: "technology", hint: "The application of scientific knowledge for practical purposes." },
        { word: "rainbow", hint: "A meteorological phenomenon that is caused by reflection, refraction, and dispersion of light." },
        { word: "universe", hint: "All existing matter, space, and time as a whole." },
        { word: "piano", hint: "A musical instrument played by pressing keys that cause hammers to strike strings." },
        { word: "vacation", hint: "A period of time devoted to pleasure, rest, or relaxation." },
        { word: "rainforest", hint: "A dense forest characterized by high rainfall and biodiversity." },
        { word: "theater", hint: "A building or outdoor area in which plays, movies, or other performances are staged." },
        { word: "telephone", hint: "A device used to transmit sound over long distances." },
        { word: "language", hint: "A system of communication consisting of words, gestures, and syntax." },
        { word: "desert", hint: "A barren or arid land with little or no precipitation." },
        { word: "sunflower", hint: "A tall plant with a large yellow flower head." },
        { word: "fantasy", hint: "A genre of imaginative fiction involving magic and supernatural elements." },
        { word: "telescope", hint: "An optical instrument used to view distant objects in space." },
        { word: "breeze", hint: "A gentle wind." },
        { word: "oasis", hint: "A fertile spot in a desert where water is found." },
        { word: "photography", hint: "The art, process, or practice of creating images by recording light or other electromagnetic radiation." },
        { word: "safari", hint: "An expedition or journey, typically to observe wildlife in their natural habitat." },
        { word: "planet", hint: "A celestial body that orbits a star and does not produce light of its own." },
        { word: "river", hint: "A large natural stream of water flowing in a channel to the sea, a lake, or another such stream." },
        { word: "tropical", hint: "Relating to or situated in the region between the Tropic of Cancer and the Tropic of Capricorn." },
        { word: "mysterious", hint: "Difficult or impossible to understand, explain, or identify." },
        { word: "enigma", hint: "Something that is mysterious, puzzling, or difficult to understand." },
        { word: "paradox", hint: "A statement or situation that contradicts itself or defies intuition." },
        { word: "puzzle", hint: "A game, toy, or problem designed to test ingenuity or knowledge." },
        { word: "whisper", hint: "To speak very softly or quietly, often in a secretive manner." },
        { word: "shadow", hint: "A dark area or shape produced by an object blocking the light." },
        { word: "secret", hint: "Something kept hidden or unknown to others." },
        { word: "curiosity", hint: "A strong desire to know or learn something." },
        { word: "unpredictable", hint: "Not able to be foreseen or known beforehand; uncertain." },
        { word: "obfuscate", hint: "To confuse or bewilder someone; to make something unclear or difficult to understand." },
        { word: "unveil", hint: "To make known or reveal something previously secret or unknown." },
        { word: "illusion", hint: "A false perception or belief; a deceptive appearance or impression." },
        { word: "moonlight", hint: "The light from the moon." },
        { word: "vibrant", hint: "Full of energy, brightness, and life." },
        { word: "nostalgia", hint: "A sentimental longing or wistful affection for the past." },
        { word: "brilliant", hint: "Exceptionally clever, talented, or impressive." }
    ];
    let customQuestion = null;
    let lastCustomQuestion = null;
    let currentWord, correctLetters, wrongGuessCount;
    const maxGuesses = 6;

    function resetGame() {
        correctLetters = [];
        wrongGuessCount = 0;
        if (hangmanImage) hangmanImage.src = "svg/hangman-0.svg";
        if (guessesText) guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
        if (wordDisplay && currentWord)
            wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
        if (keyboardDiv)
            keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
        if (gameModal) gameModal.classList.remove("show");
    }

    function getRandomWord() {
        let word, hint;
        if (customQuestion) {
            word = customQuestion.word;
            hint = customQuestion.hint;
        } else {
            const q = wordList[Math.floor(Math.random() * wordList.length)];
            word = q.word;
            hint = q.hint;
        }
        currentWord = word;
        if (document.querySelector(".hint-text b")) document.querySelector(".hint-text b").innerText = hint;
        resetGame();
    }

    function initGame(button, clickedLetter) {
        if (!currentWord) return;
        if (currentWord.includes(clickedLetter)) {
            [...currentWord].forEach((letter, index) => {
                if (letter === clickedLetter) {
                    correctLetters.push(letter);
                    wordDisplay.querySelectorAll("li")[index].innerText = letter;
                    wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
                }
            });
        } else {
            wrongGuessCount++;
            if (hangmanImage) hangmanImage.src = `svg/hangman-${wrongGuessCount}.svg`;
        }
        button.disabled = true;
        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
        if (wrongGuessCount === maxGuesses) return gameOver(false);
        if (correctLetters.length === currentWord.length) return gameOver(true);
    }

    function gameOver(isVictory) {
        if (!gameModal) return;
        // Hiển thị ảnh gif mặc định
        const img = gameModal.querySelector('img');
        if (img) {
            img.src = isVictory ? 'images/victory.gif' : 'images/lost.gif';
        }
        gameModal.querySelector("h4").innerText = isVictory
            ? languageManager.getText('congrats')
            : languageManager.getText('gameOver');
        gameModal.querySelector("p").innerHTML =
            (isVictory
                ? languageManager.getText('youFoundWord')
                : languageManager.getText('correctWord')) + ` <b>${currentWord}</b>`;
        gameModal.classList.add("show");
        if (customQuestion) {
            setTimeout(() => {
                lastCustomQuestion = customQuestion;
                lastAnswerSpan.textContent = customQuestion.word;
                lastHintSpan.textContent = customQuestion.hint;
                lastQuestionDiv.style.display = '';
                customQuestion = null;
                showModeSelect();
            }, 1500);
        }
    }

    if (keyboardDiv) {
        keyboardDiv.innerHTML = '';
        for (let i = 97; i <= 122; i++) {
            const button = document.createElement("button");
            button.innerText = String.fromCharCode(i).toUpperCase();
            keyboardDiv.appendChild(button);
            button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
        }
    }

    function showModeSelect() {
        if (modeSelect) modeSelect.style.display = '';
        if (addQuestionDiv) addQuestionDiv.style.display = 'none';
        if (document.querySelector('.puzzle-container')) document.querySelector('.puzzle-container').style.display = 'none';
    }
    function showAddQuestionForm() {
        if (modeSelect) modeSelect.style.display = 'none';
        if (addQuestionDiv) addQuestionDiv.style.display = '';
        if (document.querySelector('.puzzle-container')) document.querySelector('.puzzle-container').style.display = 'none';
    }
    function showGame() {
        if (modeSelect) modeSelect.style.display = 'none';
        if (addQuestionDiv) addQuestionDiv.style.display = 'none';
        if (document.querySelector('.puzzle-container')) document.querySelector('.puzzle-container').style.display = '';
    }

    if (modeSelect) {
        document.getElementById('mode-random').onclick = () => {
            customQuestion = null;
            showGame();
            if (lastQuestionDiv) lastQuestionDiv.style.display = 'none';
            getRandomWord();
        };
        document.getElementById('mode-add').onclick = () => {
            showAddQuestionForm();
            if (lastQuestionDiv) lastQuestionDiv.style.display = 'none';
        };
    }
    if (cancelAddBtn) {
        cancelAddBtn.onclick = () => {
            showModeSelect();
            if (lastQuestionDiv) lastQuestionDiv.style.display = lastCustomQuestion ? '' : 'none';
        };
    }
    if (addForm) {
        addForm.onsubmit = (e) => {
            e.preventDefault();
            const word = newWordInput.value.trim();
            const hint = newHintInput.value.trim();
            if (!/^[a-zA-Z]+$/.test(word)) {
                newWordInput.focus();
                newWordInput.style.borderColor = 'red';
                setTimeout(()=>{newWordInput.style.borderColor='';}, 1200);
                return;
            }
            if (word && hint) {
                customQuestion = { word, hint };
                showGame();
                getRandomWord();
            }
        };
    }
    if (playAgainBtn) playAgainBtn.onclick = getRandomWord;

    // Ẩn game khi vào puzzle, chỉ hiện chọn chế độ
    showModeSelect();
    if (lastQuestionDiv) lastQuestionDiv.style.display = 'none';
}