// ================================
// Lingdle – Main Game Logic (wiki‑enhanced)
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
   Ensure <div id="languageTree"> has dimensions for Vis‑Network
------------------------------------------------------------------ */
function setLanguageTreeSize() {
  const container = document.getElementById('languageTree');
  const wrapper = document.getElementById('languageTreeContainer');
  if (!container || !wrapper) return;
  container.style.width = '100%';
  container.style.height = (wrapper.clientHeight || 400) + 'px';
}
window.addEventListener('resize', () => {
  setLanguageTreeSize();
  if (network) {
    network.redraw();
    network.fit({ animation: { duration: 300, easingFunction: 'easeOutQuad' } });
  }
});

/* ------------------------------------------------------------------
   Daily language selector
------------------------------------------------------------------ */
function generateTodaysLanguage() {
  const startDate = new Date('2024-07-28');
  const today = new Date();
  const daysSinceStart = Math.floor((today - startDate) / 86_400_000); // ms in a day
  const languageCodes = Object.keys(languages);
  todaysLanguageCode = languageCodes[daysSinceStart % languageCodes.length];
}

/* ------------------------------------------------------------------
   Game initialisation
------------------------------------------------------------------ */
function initGame() {
  generateTodaysLanguage();
  document.getElementById('guessSection').style.display = 'block';
  document.getElementById('errorMessage').textContent = '';
  document.getElementById('languageInput').value = '';
  document.getElementById('languageTree').innerHTML = '';
  guesses = [];
  hints = 0;
  lastSharedNode = -1;
  setLanguageTreeSize();
  loadAudio(todaysLanguageCode);
  updateGameStatus();
  initializeNetwork();
  populateLanguageList();

  // Remove sidebar (if any) when starting a fresh game
  const oldSidebar = document.getElementById('wikiSidebar');
  if (oldSidebar) oldSidebar.remove();
}

document.addEventListener('DOMContentLoaded', initGame);

/* ------------------------------------------------------------------
   Auto‑complete datalist
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

function handleLanguageInput() {
  const val = document.getElementById('languageInput').value.toLowerCase();
  const list = document.getElementById('languageList');
  list.innerHTML = '';
  Object.values(languages)
    .filter(l => l.Language.toLowerCase().startsWith(val))
    .forEach(l => {
      const o = document.createElement('option');
      o.value = l.Language;
      list.appendChild(o);
    });
}

/* ------------------------------------------------------------------
   Utility helpers
------------------------------------------------------------------ */
const showError = msg => (document.getElementById('errorMessage').textContent = msg);
const isLanguageSupported = lang => Object.values(languages).some(l => l.Language.toLowerCase() === lang.toLowerCase());
const getLanguageCode = lang => Object.keys(languages).find(c => languages[c].Language.toLowerCase() === lang.toLowerCase());

/* ------------------------------------------------------------------
   Wikipedia API helpers
------------------------------------------------------------------ */
async function fetchWikiInfo(languageName) {
  const query = encodeURIComponent(`${languageName} language`);
  try {
    const resp = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${query}`);
    if (!resp.ok) throw new Error('Wiki fetch failed');
    const data = await resp.json();
    showWikiSidebar(data);
  } catch (e) {
    console.error(e);
  }
}

function showWikiSidebar(data) {
  let sidebar = document.getElementById('wikiSidebar');
  if (!sidebar) {
    sidebar = document.createElement('div');
    sidebar.id = 'wikiSidebar';
    Object.assign(sidebar.style, {
      position: 'fixed',
      top: '0',
      right: '0',
      width: '320px',
      height: '100vh',
      overflowY: 'auto',
      backgroundColor: 'var(--surface)',
      borderLeft: '1px solid var(--border)',
      color: 'var(--text)',
      fontFamily: "'JetBrains Mono', monospace",
      padding: '1rem',
      zIndex: 1050,
    });
    document.body.appendChild(sidebar);
  }
  sidebar.innerHTML = `
    <h3 style="font-size:1.25rem;font-weight:700;margin-top:0">${data.title}</h3>
    ${data.originalimage ? `<img src="${data.originalimage.source}" style="max-width:100%;border:1px solid var(--border);margin-bottom:0.75rem">` : ''}
    <div style="font-size:0.9rem;line-height:1.4">${data.extract_html || data.extract}</div>
    <p style="margin-top:0.75rem"><a href="https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}" target="_blank" style="color:var(--accent-primary);text-decoration:none">Read more on Wikipedia ↗</a></p>
  `;
}

/* ------------------------------------------------------------------
   Guess submission handler
------------------------------------------------------------------ */
function handleLanguageSubmission() {
  const input = document.getElementById('languageInput').value.trim();
  if (!isLanguageSupported(input)) return showError('This language is not supported yet');
  const code = getLanguageCode(input);
  const correct = code === todaysLanguageCode;
  guesses.push({ guess: input, correct });

  updateNetwork(code, correct);
  if (correct) {
    fetchWikiInfo(input);
    showScore();
  } else if (guesses.length >= maxGuesses) {
    fetchWikiInfo(languages[todaysLanguageCode].Language);
    showScore();
  } else {
    showError('Incorrect guess. Try again.');
  }
  updateGameStatus();
}

/* ------------------------------------------------------------------
   Vis‑Network setup
------------------------------------------------------------------ */
function initializeNetwork() {
  const container = document.getElementById('languageTree');
  const data = { nodes: new vis.DataSet([]), edges: new vis.DataSet([]) };
  const options = {
    layout: { hierarchical: { direction: 'UD', levelSeparation: 75, nodeSpacing: 350 } },
    nodes: {
      shape: 'box',
      font: { size: 30, face: 'JetBrains Mono' },
      borderWidth: 2,
      shadow: true,
      size: 60,
    },
    edges: { width: 3, shadow: true, smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.4 } },
    physics: false,
    interaction: { dragNodes: false, zoomView: true, dragView: true },
  };
  network = new vis.Network(container, data, options);
  network.on('afterDrawing', () => {
    const canvas = container.querySelector('canvas');
    if (canvas) canvas.style.position = 'absolute';
  });
  network.once('afterDrawing', () => {
    network.setSize('100%', '100%');
    network.fit({ animation: { duration: 600, easingFunction: 'easeOutQuad' } });
  });
}

/* ------------------------------------------------------------------
   Build / colour the network tree
------------------------------------------------------------------ */
function updateNetwork(languageCode, correct) {
  const lang = languages[languageCode];
  const answerLang = languages[todaysLanguageCode];
  const families = lang['Pruned Language Families'].split(', ');
  const answerFamilies = answerLang['Pruned Language Families'].split(', ');
  const { nodes, edges } = network.body.data;

  let parentId = null;
  families.forEach((family, idx) => {
    const id = `family_${idx}_${family}`;
    const shared = answerFamilies.includes(family);
    if (shared && idx > lastSharedNode) lastSharedNode = idx;

    if (!nodes.get(id)) {
      nodes.add({ id, label: family, color: { background: shared ? '#34a853' : '#f28b82', border: '#ffffff' }, font: { color: '#ffffff' } });
    } else if (shared) {
      nodes.update({ id, color: { background: '#34a853', border: '#ffffff' } });
    }

    if (parentId) {
      const edgeId = `${parentId}_${id}`;
      if (!edges.get(edgeId)) edges.add({ id: edgeId, from: parentId, to: id });
    }
    parentId = id;
  });

  const langId = `language_${languageCode}`;
  if (!nodes.get(langId)) {
    nodes.add({ id: langId, label: lang.Language, color: { background: correct ? '#34a853' : '#f28b82', border: '#ffffff' }, font: { color: '#ffffff' } });
    edges.add({ id: `${parentId}_${langId}`, from: parentId, to: langId });
  }

  network.fit({ animation: { duration: 400, easingFunction: 'easeOutQuad' } });
}

/* ------------------------------------------------------------------
   Hint logic
------------------------------------------------------------------ */
function handleHintRequest() {
  if (hints >= maxHints) return;
  hints++;
  const answer = languages[todaysLanguageCode];
  const families = answer['Pruned Language Families'].split(', ');
  const { nodes, edges } = network.body.data;

  let parentId = null;
  if (lastSharedNode >= 0) parentId = `family_${lastSharedNode}_${families[lastSharedNode]}`;
  lastSharedNode += 1;

  const isLast = lastSharedNode === families.length;
  const id = isLast ? `language_${todaysLanguageCode}` : `family_${lastSharedNode}_${families[lastSharedNode]}`;
  const label = isLast ? answer.Language : families[lastSharedNode];

  if (!nodes.get(id)) {
    nodes.add({ id, label, color: { background: '#34a853', border: '#ffffff' }, font: { color: '#ffffff' } });
    if (parentId) edges.add({ id: `${parentId}_${id}`, from: parentId, to: id });
  }
  updateGameStatus();
  network.fit({ animation: { duration: 300, easingFunction: 'easeOutQuad' } });
}

/* ------------------------------------------------------------------
   Audio helper
------------------------------------------------------------------ */
function loadAudio(code) {
  document.getElementById('audioSource').src = `LanguageAudio/${code}.wav`;
  document.getElementById('languageAudio').load();
}

/* ------------------------------------------------------------------
   Status bar (guesses & hints)
------------------------------------------------------------------ */
function updateGameStatus() {
  const guessSpan = '<span class="status-icon available"></span>'.repeat(maxGuesses - guesses.length) + '<span class="status-icon used"></span>'.repeat(guesses.length);
  const hintSpan = '<span class="status-icon available"></span>'.repeat(maxHints - hints) + '<span class="status-icon used"></span>'.repeat(hints);
  document.getElementById('guessesLeft').innerHTML = `Guesses: ${guessSpan}`;
  document.getElementById('hintsLeft').innerHTML = `Hints: ${hintSpan}`;
}

/* ------------------------------------------------------------------
   Score modal & sharing
------------------------------------------------------------------ */
function showScore() {
  const modal = new bootstrap.Modal(document.getElementById('scoreModal'));
  const blocks = guesses.map(g => (g.correct ? '🟩' : '🟥')).join('');
  document.getElementById('scoreText').textContent = `${blocks}\nHints used: ${'💡'.repeat(hints)}`;

  const dayNum = Math.floor((Date.now() - new Date('2024-07-28')) / 86_400_000);
  document.getElementById('shareBtn').onclick = () => {
    const txt = `Lingdle ${dayNum}\n${blocks}\nHints used: ${'💡'.repeat(hints)}\n` + 'jerdgerd.github.io/lingdle';
    navigator.clipboard.writeText(txt).then(() => showToast('Copied to clipboard!')).catch(() => showToast('Failed to copy'));
  };

  const nextDay = new Date();
  nextDay.setHours(24, 0, 0, 0);
  const countdownEl = document.getElementById('countdown');
  const interval = setInterval(() => {
    const diff = nextDay - Date.now();
    if (diff <= 0) return clearInterval(interval);
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1_000);
    countdownEl.textContent = `Next game in: ${h}h ${m}m ${s}s`;
  }, 1000);

  modal.show();
}

const showToast = msg => {
  const toast = document.getElementById('toast');
  toast.querySelector('.toast-body').textContent = msg;
  toast.classList.remove('hide');
  toast.classList.add('show');
  setTimeout(() => toast.classList.replace('show', 'hide'), 3000);
};

/* ------------------------------------------------------------------
   Event listeners
------------------------------------------------------------------ */
document.getElementById('submitBtn').addEventListener('click', handleLanguageSubmission);
document.getElementById('hintBtn').addEventListener('click', handleHintRequest);
document.getElementById('languageInput').addEventListener('input', handleLanguageInput);
