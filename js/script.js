// ================================
// Lingdle – Main Game Logic (patched)
// ================================

// Variables
let todaysLanguageCode;
let guesses = [];
let hints = 0;
const maxHints = 3;
const maxGuesses = 6;
let network;
let lastSharedNode = -1;

/* ------------------------------------------------------------------
   Helpers to ensure the <div id="languageTree"> has real dimensions.
   The recent CSS refactor removed explicit width/height, so we enforce
   them via JS to guarantee the Vis‑Network canvas is allocated space.
------------------------------------------------------------------ */
function setLanguageTreeSize() {
  const container = document.getElementById('languageTree');
  const wrapper = document.getElementById('languageTreeContainer');
  if (!container || !wrapper) return;

  // Full width, inherit height from outer container (fallback to 400px)
  container.style.width = '100%';
  container.style.height = (wrapper.clientHeight || 400) + 'px';
}

// Re‑apply on resize so the graph keeps up with viewport changes
window.addEventListener('resize', () => {
  setLanguageTreeSize();
  if (network) {
    network.redraw();
    network.fit({ animation: { duration: 300, easingFunction: 'easeOutQuad' } });
  }
});

// ------------------------------------------------------------------
// Generate today's language using a pseudorandom algorithm
// ------------------------------------------------------------------
function generateTodaysLanguage() {
  const startDate = new Date('2024-07-28');
  const today = new Date();
  const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const languageCodes = Object.keys(languages);
  const languageIndex = daysSinceStart % languageCodes.length;
  todaysLanguageCode = languageCodes[languageIndex];
}

// ------------------------------------------------------------------
// Initialise the game
// ------------------------------------------------------------------
function initGame() {
  generateTodaysLanguage();
  document.getElementById('guessSection').style.display = 'block';
  document.getElementById('errorMessage').textContent = '';
  document.getElementById('languageInput').value = '';
  document.getElementById('languageTree').innerHTML = '';
  guesses = [];
  hints = 0;
  lastSharedNode = -1;
  setLanguageTreeSize();            // NEW ⇒ ensure container sized **before** building network
  loadAudio(todaysLanguageCode);
  updateGameStatus();
  initializeNetwork();
  populateLanguageList();
}

/* ------------------------------------------------------------------
   Populate language list for autofill
------------------------------------------------------------------ */
function populateLanguageList() {
  const languageList = document.getElementById('languageList');
  languageList.innerHTML = '';
  Object.values(languages).forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.Language;
    languageList.appendChild(option);
  });
}

/* ------------------------------------------------------------------
   Live filter for datalist
------------------------------------------------------------------ */
function handleLanguageInput() {
  const input = document.getElementById('languageInput');
  const value = input.value.toLowerCase();
  const datalist = document.getElementById('languageList');

  datalist.innerHTML = '';

  Object.values(languages)
    .filter(lang => lang.Language.toLowerCase().startsWith(value))
    .forEach(lang => {
      const option = document.createElement('option');
      option.value = lang.Language;
      datalist.appendChild(option);
    });
}

/* ------------------------------------------------------------------
   Utility helpers
------------------------------------------------------------------ */
function showError(message) {
  document.getElementById('errorMessage').textContent = message;
}

function isLanguageSupported(language) {
  return Object.values(languages).some(
    lang => lang.Language.toLowerCase() === language.toLowerCase()
  );
}

function getLanguageCode(language) {
  return Object.keys(languages).find(
    code => languages[code].Language.toLowerCase() === language.toLowerCase()
  );
}

/* ------------------------------------------------------------------
   Handle a guess submission
------------------------------------------------------------------ */
function handleLanguageSubmission() {
  const languageInput = document.getElementById('languageInput').value.trim();
  if (!isLanguageSupported(languageInput)) {
    showError('This language is not supported yet');
    return;
  }

  const languageCode = getLanguageCode(languageInput);
  const isCorrect = languageCode === todaysLanguageCode;

  guesses.push({ guess: languageInput, correct: isCorrect });
  updateNetwork(languageCode, isCorrect);

  if (isCorrect || guesses.length >= maxGuesses) {
    showScore();
  } else {
    showError('Incorrect guess. Try again.');
  }

  updateGameStatus();
}

/* ------------------------------------------------------------------
   Build Vis‑Network graph
------------------------------------------------------------------ */
function initializeNetwork() {
  const container = document.getElementById('languageTree');
  const data = { nodes: new vis.DataSet([]), edges: new vis.DataSet([]) };

  const options = {
    layout: {
      hierarchical: {
        direction: 'UD',
        sortMethod: 'directed',
        levelSeparation: 75,
        nodeSpacing: 350
      }
    },
    nodes: {
      shape: 'box',
      font: { size: 30, face: 'JetBrains Mono' },
      borderWidth: 2,
      shadow: true,
      size: 60
    },
    edges: {
      width: 3,
      shadow: true,
      smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.4 }
    },
    physics: false,
    interaction: { dragNodes: false, zoomView: true, dragView: true }
  };

  network = new vis.Network(container, data, options);

  // Keep canvas inside parent scroll area
  network.on('afterDrawing', () => {
    const canvas = container.querySelector('canvas');
    if (canvas) canvas.style.position = 'absolute';
  });

  network.once('afterDrawing', () => {
    network.setSize('100%', '100%'); // obey the container we just sized
    network.fit({ animation: { duration: 600, easingFunction: 'easeOutQuad' } });
  });
}

/* ------------------------------------------------------------------
   Update/fill the language‑family tree
------------------------------------------------------------------ */
function updateNetwork(languageCode, correct) {
  const language = languages[languageCode];
  const correctLanguage = languages[todaysLanguageCode];
  const families = language['Pruned Language Families'].split(', ');
  const correctFamilies = correctLanguage['Pruned Language Families'].split(', ');
  const { nodes, edges } = network.body.data;

  let parentId = null;
  families.forEach((family, index) => {
    const id = `family_${index}_${family}`;
    const isShared = correctFamilies.includes(family);
    if (isShared && index > lastSharedNode) lastSharedNode = index;

    if (!nodes.get(id)) {
      nodes.add({
        id,
        label: family,
        color: { background: isShared ? '#34a853' : '#f28b82', border: '#ffffff' },
        font: { color: '#ffffff' }
      });
    } else if (isShared) {
      // update to shared (green) if previously red
      nodes.update({ id, color: { background: '#34a853', border: '#ffffff' } });
    }

    if (parentId) {
      const edgeId = `${parentId}_${id}`;
      if (!edges.get(edgeId)) edges.add({ id: edgeId, from: parentId, to: id });
    }
    parentId = id;
  });

  const languageId = `language_${languageCode}`;
  if (!nodes.get(languageId)) {
    nodes.add({
      id: languageId,
      label: language.Language,
      color: { background: correct ? '#34a853' : '#f28b82', border: '#ffffff' },
      font: { color: '#ffffff' }
    });
    edges.add({ id: `${parentId}_${languageId}`, from: parentId, to: languageId });
  }

  network.fit({ animation: { duration: 400, easingFunction: 'easeOutQuad' } });
}

/* ------------------------------------------------------------------
   Provide a hint – reveal the next family or the answer itself
------------------------------------------------------------------ */
function handleHintRequest() {
  if (hints >= maxHints) return;
  hints++;

  const correctLanguage = languages[todaysLanguageCode];
  const families = correctLanguage['Pruned Language Families'].split(', ');
  const { nodes, edges } = network.body.data;

  let parentId = null;
  if (lastSharedNode >= 0) {
    parentId = `family_${lastSharedNode}_${families[lastSharedNode]}`;
  }

  lastSharedNode += 1;

  let id, label;
  if (lastSharedNode === families.length) {
    id = `language_${todaysLanguageCode}`;
    label = correctLanguage.Language;
  } else {
    label = families[lastSharedNode];
    id = `family_${lastSharedNode}_${label}`;
  }

  if (!nodes.get(id)) {
    nodes.add({ id, label, color: { background: '#34a853', border: '#ffffff' }, font: { color: '#ffffff' } });
    if (parentId) edges.add({ id: `${parentId}_${id}`, from: parentId, to: id });
  }

  updateGameStatus();
  network.fit({ animation: { duration: 300, easingFunction: 'easeOutQuad' } });
}

/* ------------------------------------------------------------------
   Audio loading helper
------------------------------------------------------------------ */
function loadAudio(languageCode) {
  const audioPath = `LanguageAudio/${languageCode}.wav`;
  document.getElementById('audioSource').src = audioPath;
  document.getElementById('languageAudio').load();
}

/* ------------------------------------------------------------------
   Update the guess / hint counters
------------------------------------------------------------------ */
function updateGameStatus() {
  const guessesLeft = document.getElementById('guessesLeft');
  const hintsLeft = document.getElementById('hintsLeft');

  guessesLeft.innerHTML =
    'Guesses: ' +
    '<span class="status-icon available"></span>'.repeat(maxGuesses - guesses.length) +
    '<span class="status-icon used"></span>'.repeat(guesses.length);

  hintsLeft.innerHTML =
    'Hints: ' +
    '<span class="status-icon available"></span>'.repeat(maxHints - hints) +
    '<span class="status-icon used"></span>'.repeat(hints);
}

/* ------------------------------------------------------------------
   Final scoring modal & clipboard share
------------------------------------------------------------------ */
function showScore() {
  const modal = new bootstrap.Modal(document.getElementById('scoreModal'));
  let scoreText = guesses.map(g => (g.correct ? '🟩' : '🟥')).join('');
  scoreText += '\nHints used: ' + '💡'.repeat(hints);
  document.getElementById('scoreText').textContent = scoreText;

  // share to clipboard
  const daysSinceStart = Math.floor((Date.now() - new Date('2024-07-28')) / 86_400_000);
  document.getElementById('shareBtn').onclick = () => {
    const shareText = `Lingdle ${daysSinceStart}\n${scoreText}\njerdgerd.github.io/lingdle`;
    navigator.clipboard.writeText(shareText)
      .then(() => showToast('Copied to clipboard!'))
      .catch(() => showToast('Failed to copy to clipboard'));
  };

  // countdown to next puzzle
  const nextDay = new Date();
  nextDay.setHours(24, 0, 0, 0);
  const countdownElement = document.getElementById('countdown');
  const interval = setInterval(() => {
    const diff = nextDay - new Date();
    if (diff <= 0) return clearInterval(interval);
    const hrs = Math.floor(diff / 3_600_000);
    const mins = Math.floor((diff % 3_600_000) / 60_000);
    const secs = Math.floor((diff % 60_000) / 1_000);
    countdownElement.textContent = `Next game in: ${hrs}h ${mins}m ${secs}s`;
  }, 1_000);

  modal.show();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.querySelector('.toast-body').textContent = message;
  toast.classList.remove('hide');
  toast.classList.add('show');
  setTimeout(() => toast.classList.replace('show', 'hide'), 3_000);
}

/* ------------------------------------------------------------------
   Event listeners & bootstrap
------------------------------------------------------------------ */
document.getElementById('submitBtn').addEventListener('click', handleLanguageSubmission);
document.getElementById('hintBtn').addEventListener('click', handleHintRequest);
document.getElementById('languageInput').addEventListener('input', handleLanguageInput);

document.addEventListener('DOMContentLoaded', () => {
  initGame();
});
