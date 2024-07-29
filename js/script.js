// Variables
let todaysLanguageCode;
let guesses = [];
let hints = 0;
const maxHints = 3;
const maxGuesses = 6;
let network;

// Generate today's language using a pseudorandom algorithm
function generateTodaysLanguage() {
    const startDate = new Date('2024-07-28');
    const today = new Date();
    const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const languageCodes = Object.keys(languages);
    const languageIndex = daysSinceStart % languageCodes.length;
    todaysLanguageCode = languageCodes[languageIndex];
}

// Initialize game
function initGame() {
    generateTodaysLanguage();
    document.getElementById('guessSection').style.display = 'block';
    document.getElementById('errorMessage').textContent = '';
    document.getElementById('languageInput').value = '';
    document.getElementById('languageTree').innerHTML = '';
    guesses = [];
    hints = 0;
    loadAudio(todaysLanguageCode);
    updateGameStatus();
    initializeNetwork();
    populateLanguageList();
}

// Populate language list for autofill
function populateLanguageList() {
    const languageList = document.getElementById('languageList');
    languageList.innerHTML = '';
    Object.values(languages).forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.Language;
        languageList.appendChild(option);
    });
}

// Handle language input
function handleLanguageInput() {
    const input = document.getElementById('languageInput');
    const value = input.value.toLowerCase();
    const datalist = document.getElementById('languageList');
    
    // Clear existing options
    datalist.innerHTML = '';
    
    // Filter languages based on input
    const filteredLanguages = Object.values(languages).filter(lang => 
        lang.Language.toLowerCase().startsWith(value)
    );
    
    // Add filtered options to datalist
    filteredLanguages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.Language;
        datalist.appendChild(option);
    });
}


// Show error message
function showError(message) {
    document.getElementById('errorMessage').textContent = message;
}

// Check if the input language is supported
function isLanguageSupported(language) {
    return Object.values(languages).some(lang => lang.Language.toLowerCase() === language.toLowerCase());
}

// Get language code by name
function getLanguageCode(language) {
    return Object.keys(languages).find(code => languages[code].Language.toLowerCase() === language.toLowerCase());
}

// Handle language submission
function handleLanguageSubmission() {
    const languageInput = document.getElementById('languageInput').value.trim();
    if (!isLanguageSupported(languageInput)) {
        showError('This language is not supported yet');
        return;
    }

    const languageCode = getLanguageCode(languageInput);
    if (languageCode === todaysLanguageCode) {
        guesses.push({ guess: languageInput, correct: true });
        updateNetwork(languageCode, true);
        showScore();
    } else {
        guesses.push({ guess: languageInput, correct: false });
        updateNetwork(languageCode, false);
        if (guesses.length >= maxGuesses) {
            showScore();
        } else {
            showError('Incorrect guess. Try again.');
        }
    }
    updateGameStatus();
}

// Initialize network
function initializeNetwork() {
    const container = document.getElementById('languageTree');
    const data = {
        nodes: new vis.DataSet([]),
        edges: new vis.DataSet([])
    };
    const options = {
        layout: {
            hierarchical: {
                direction: 'UD',
                sortMethod: 'directed',
                levelSeparation: 100,
                nodeSpacing: 250,
                blockShifting: true,
                edgeMinimization: true,
            }
        },
        nodes: {
            shape: 'box',
            font: {
                size: 30,
                face: 'Arial'
            },
            borderWidth: 2,
            shadow: true,
            size: 60
        },
        edges: {
            width: 3,
            shadow: true,
            smooth: {
                type: 'cubicBezier',
                forceDirection: 'horizontal',
                roundness: 0.4
            }
        },
        physics: false,
        interaction: {
            dragNodes: false,
            zoomView: true,
            dragView: true
        }
    };
    network = new vis.Network(container, data, options);
    network.on("afterDrawing", function (ctx) {
        const networkCanvas = document.getElementsByClassName('vis-network')[0].getElementsByTagName('canvas')[0];
        networkCanvas.style.position = 'absolute';
    });
    network.once("afterDrawing", function() {
        network.fit({
            animation: {
                duration: 1000,
                easingFunction: 'easeOutQuad'
            }
        });
    });
}

// Update network
function updateNetwork(languageCode, correct) {
    const language = languages[languageCode];
    const correctLanguage = languages[todaysLanguageCode];
    const families = language["Pruned Language Families"].split(', ');
    const correctFamilies = correctLanguage["Pruned Language Families"].split(', ');
    const nodes = network.body.data.nodes;
    const edges = network.body.data.edges;

    let parentId = null;
    families.forEach((family, index) => {
        const id = `family_${index}_${family}`;
        const isShared = correctFamilies.includes(family);
        if (!nodes.get(id)) {
            nodes.add({
                id: id, 
                label: family, 
                color: { background: isShared ? '#4caf50' : '#f44336', border: '#ffffff' },
                font: { color: '#ffffff' }
            });
        } else {
            // Update existing node color if it's shared
            if (isShared) {
                nodes.update({id: id, color: { background: '#4caf50', border: '#ffffff' }});
            }
        }
        if (parentId) {
            const edgeId = `${parentId}_${id}`;
            if (!edges.get(edgeId)) {
                edges.add({id: edgeId, from: parentId, to: id});
            }
        }
        parentId = id;
    });

    const languageId = `language_${languageCode}`;
    if (!nodes.get(languageId)) {
        nodes.add({
            id: languageId, 
            label: language.Language, 
            color: { background: correct ? '#4caf50' : '#f44336', border: '#ffffff' },
            font: { color: '#ffffff' }
        });
        edges.add({id: `${parentId}_${languageId}`, from: parentId, to: languageId});
    }

    network.fit();
}

// Show hints
function handleHintRequest() {
    if (hints >= maxHints) {
        return;
    }
    hints++;
    const correctLanguage = languages[todaysLanguageCode];
    const families = correctLanguage["Pruned Language Families"].split(', ');
    updateNetwork(todaysLanguageCode, true);
    const nodes = network.body.data.nodes;
    for (let i = 0; i <= hints; i++) {
        const id = `family_${i}_${families[i]}`;
        const node = nodes.get(id);
        if (node) {
            nodes.update({id: id, hidden: false});
        }
    }
    updateGameStatus();
    network.fit();
}

// Load audio
function loadAudio(languageCode) {
    const audioPath = `LanguageAudio/${languageCode}.wav`;
    document.getElementById('audioSource').src = audioPath;
    document.getElementById('languageAudio').load();
}

// Update game status
function updateGameStatus() {
    const guessesLeft = document.getElementById('guessesLeft');
    const hintsLeft = document.getElementById('hintsLeft');

    guessesLeft.innerHTML = 'Guesses: ' + 
        '<span class="status-icon available"></span>'.repeat(maxGuesses - guesses.length) +
        '<span class="status-icon used"></span>'.repeat(guesses.length);

    hintsLeft.innerHTML = 'Hints: ' + 
        '<span class="status-icon available"></span>'.repeat(maxHints - hints) +
        '<span class="status-icon used"></span>'.repeat(hints);
}

// Show score modal
function showScore() {
    const modal = new bootstrap.Modal(document.getElementById('scoreModal'));
    let scoreText = '';
    guesses.forEach(guess => {
        scoreText += guess.correct ? '🟩' : '🟥';
    });
    for (let i = guesses.length; i < maxGuesses; i++) {
        scoreText += '⬜';
    }
    scoreText += '\nHints used: ' + '💡'.repeat(hints);
    document.getElementById('scoreText').textContent = scoreText;

    // Add share button functionality
    const daysSinceStart = Math.floor((new Date() - new Date('2024-07-28')) / (1000 * 60 * 60 * 24));
    document.getElementById('shareBtn').addEventListener('click', () => {
        const shareText = `Lingdle ${daysSinceStart}\n${scoreText}`;
        navigator.clipboard.writeText(shareText)
            .then(() => {
                showToast('Copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                showToast('Failed to copy to clipboard');
            });
    });

    // Show countdown
    const nextDay = new Date();
    nextDay.setHours(24, 0, 0, 0);
    const countdownElement = document.getElementById('countdown');
    setInterval(() => {
        const now = new Date();
        const diff = nextDay - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        countdownElement.textContent = `Next game in: ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);

    modal.show();
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.querySelector('.toast-body').textContent = message;
    toast.classList.remove('hide');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
    }, 3000);
}

// Event listeners
document.getElementById('submitBtn').addEventListener('click', handleLanguageSubmission);
document.getElementById('hintBtn').addEventListener('click', handleHintRequest);
document.getElementById('languageInput').addEventListener('input', handleLanguageInput);

// Initialize the game on load
initGame();