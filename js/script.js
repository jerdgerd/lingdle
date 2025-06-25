// ================================
// Lingdle – Main Game Logic (persistence + lockout)
// ================================

// ---------------- Shared State ----------------
let todaysLanguageCode;
let guesses = [];
let hints = 0;
const maxHints = 3;
const maxGuesses = 6;
let network;
let lastSharedNode = -1;
let gameOver = false;

// Build a YYYY‑MM‑DD stamp for localStorage keys
const todayStamp = new Date().toISOString().split('T')[0];
const storageKey = `lingdle_${todayStamp}`; // holds {guesses, hints}

/* ------------------------------------------------------------------
   Ensure <div id="languageTree"> is sized for Vis‑Network
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
    network.fit({ animation: { duration: 250, easingFunction: 'easeOutQuad' } });
  }
});

/* ------------------------------------------------------------------
   Daily language selector
------------------------------------------------------------------ */
function generateTodaysLanguage() {
  const startDate = new Date('2024-07-28');
  const today = new Date();
  const daysSinceStart = Math.floor((today - startDate) / 86_400_000);
  const languageCodes = Object.keys(languages);
  todaysLanguageCode = languageCodes[daysSinceStart % languageCodes.length];
}

/* ------------------------------------------------------------------
   Game initialisation
------------------------------------------------------------------ */
function initGame() {
  generateTodaysLanguage();
  restoreIfCompleted();
  if (gameOver) return; // restoreIfCompleted takes over UI if done

  // Fresh game
  document.getElementById('guessSection').style.display = 'block';
  ['errorMessage'].forEach(id => (document.getElementById(id).textContent = ''));
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

  // Remove wiki sidebar from previous day
  const old = document.getElementById('wikiSidebar');
  if (old) old.remove();
}

/* ------------------------------------------------------------------
   Restore finished game (if cookie present)
------------------------------------------------------------------ */
function restoreIfCompleted() {
  const stored = localStorage.getItem(storageKey);
  if (!stored) return;

  try {
    const { guesses: g = [], hints: h = 0 } = JSON.parse(stored);
    guesses = g;
    hints = h;
  } catch {
    return; // malformed – treat as new game
  }

  // We know the answer, so show wiki, score, and disable play
  gameOver = true;
  disablePlayInputs();
  updateGameStatus();
  fetchWikiInfo(languages[todaysLanguageCode].Language);
  showScore();
}

/* ------------------------------------------------------------------
   Disable submit / hint / text once game ends
------------------------------------------------------------------ */
function disablePlayInputs() {
  ['submitBtn', 'hintBtn', 'languageInput'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('disabled', 'disabled');
  });
}

function enablePlayInputs() {
  ['submitBtn', 'hintBtn', 'languageInput'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.removeAttribute('disabled');
  });
}

/* ------------------------------------------------------------------
   At the moment a game finishes
------------------------------------------------------------------ */
function finalizeGame() {
  gameOver = true;
  disablePlayInputs();
  localStorage.setItem(storageKey, JSON.stringify({ guesses, hints }));
}

/* ------------------------------------------------------------------
   Auto‑complete datalist
------------------------------------------------------------------ */
function populateLanguageList() {
  const list = document.getElementById('languageList');
  list.innerHTML = '';
  Object.values(languages).forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.Language;
    list.appendChild(option);
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
   Wikipedia API
------------------------------------------------------------------ */
async function fetchWikiInfo(languageName) {
  const query = encodeURIComponent(`${languageName} language`);
  try {
    const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${query}`);
    if (!r.ok) throw new Error('wiki');
    const d = await r.json();
    showWikiSidebar(d);
  } catch (err) {
    console.error(err);
  }
}

function showWikiSidebar(d) {
  let bar = document.getElementById('wikiSidebar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'wikiSidebar';
    Object.assign(bar.style, {
      position: 'fixed', top: '0', right: '0', width: '320px', height: '100vh', overflowY: 'auto',
      backgroundColor: 'var(--surface)', borderLeft: '1px solid var(--border)', color: 'var(--text)',
      fontFamily: "'JetBrains Mono', monospace", padding: '1rem', zIndex: 1050,
    });
    document.body.appendChild(bar);
  }
  bar.innerHTML = `
    <h3 style="font-size:1.25rem;font-weight:700;margin-top:0">${d.title}</h3>
    ${d.originalimage ? `<img src="${d.originalimage.source}" style="max-width:100%;border:1px solid var(--border);margin-bottom:0.75rem">` : ''}
    <div style="font-size:0.9rem;line-height:1.4">${d.extract_html || d.extract}</div>
    <p style="margin-top:0.75rem"><a href="https://en.wikipedia.org/wiki/${encodeURIComponent(d.title)}" target="_blank" style="color:var(--accent-primary);text-decoration:none">Read more on Wikipedia ↗</a></p>`;
}

/* ------------------------------------------------------------------
   Audio helper
------------------------------------------------------------------ */
function loadAudio(code) {
  const audioPath = `LanguageAudio/${code}.wav`;
  const src = document.getElementById('audioSource');
  const audio = document.getElementById('languageAudio');
  if (!src || !audio) return;
  src.src = audioPath;
  audio.load();
}

/* ------------------------------------------------------------------
   Guess submission
------------------------------------------------------------------ */
function handleLanguageSubmission() {
  if (gameOver) return; // locked for the day

  const val = document.getElementById('languageInput').value.trim();
  if (!isLanguageSupported(val)) return showError('This language is not supported yet');

  const code = getLanguageCode(val);
  const correct = code === todaysLanguageCode;
  guesses.push({ guess: val, correct });
  updateNetwork(code, correct);

  if (correct || guesses.length >= maxGuesses) {
    fetchWikiInfo(languages[todaysLanguageCode].Language);
    finalizeGame();
    showScore();
  } else {
    showError('Incorrect guess. Try again.');
  }

  updateGameStatus();
}

/* ------------------------------------------------------------------
   Vis‑Network construction
------------------------------------------------------------------ */
function initializeNetwork() {
  const container = document.getElementById('languageTree');
  const data = { nodes: new vis.DataSet(), edges: new vis.DataSet() };
  const opts = {
    layout: { hierarchical: { direction: 'UD', levelSeparation: 75, nodeSpacing: 350 } },
    nodes: { shape: 'box', font: { size: 30, face: 'JetBrains Mono' }, borderWidth: 2, shadow: true, size: 60 },
    edges: { width: 3, shadow: true, smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.4 } },
    physics: false, interaction: { dragNodes: false, zoomView: true, dragView: true },
  };
  network = new vis.Network(container, data, opts);
  network.on('afterDrawing', () => {
    const canvas = container.querySelector('canvas');
    if (canvas) canvas.style.position = 'absolute';
  });
  network.once('afterDrawing', () => {
    network.setSize('100%', '100%');
    network.fit({ animation: { duration: 550, easingFunction: 'easeOutQuad' } });
  });
}

/* ------------------------------------------------------------------
   Graph updates (guesses & hints)
------------------------------------------------------------------ */
function updateNetwork(languageCode, correct) {
  const lang = languages[languageCode];
  const answerLang = languages[todaysLanguageCode];
  const fams = lang['Pruned Language Families'].split(', ');
  const answerFams = answerLang['Pruned Language Families'].split(', ');
  const { nodes, edges } = network.body.data;

  let parentId = null;
  fams.forEach((f, i) => {
    const id = `fam_${i}_${f}`;
    const shared = answerFams.includes(f);
    if (shared && i > lastSharedNode) lastSharedNode = i;

    if (!nodes.get(id)) {
      nodes.add({ id, label: f, color: { background: shared ? '#34a853' : '#f28b82', border: '#ffffff' }, font: { color: '#ffffff' } });
    } else if (shared) {
      nodes.update({ id, color: { background: '#34a853', border: '#ffffff' } });
    }

    if (parentId) {
      const eid = `${parentId}_${id}`;
      if (!edges.get(eid)) edges.add({ id: eid, from: parentId, to: id });
    }
    parentId = id;
  });

  const langId = `lang_${languageCode}`;
  if (!nodes.get(langId)) {
    nodes.add({ id: langId, label: lang.Language, color: { background: correct ? '#34a853' : '#f28b82', border: '#ffffff' }, font: { color: '#ffffff' } });
    edges.add({ id: `${parentId}_${langId}`, from: parentId, to: langId });
  }
  network.fit({ animation: { duration: 350, easingFunction: 'easeOutQuad' } });
}

/* ------------------------------------------------------------------
   Hint mechanic
------------------------------------------------------------------ */
function handleHintRequest() {
  if (gameOver || hints >= maxHints) return;
  hints++;

  const ans = languages[todaysLanguageCode];
  const fams = ans['Pruned Language Families'].split(', ');
  const { nodes, edges } = network.body.data;

  let parentId = null;
  if (lastSharedNode >= 0) parentId = `fam_${lastSharedNode}_${fams[lastSharedNode]}`;
  lastSharedNode += 1;

  const last = lastSharedNode === fams.length;
  const id = last ? `lang_${todaysLanguageCode}` : `fam_${lastSharedNode}_${fams[lastSharedNode]}`;
  const label = last ? ans.Language : fams[lastSharedNode];

  if (!nodes.get(id)) {
    nodes.add({ id, label, color: { background: '#34a853', border: '#ffffff' }, font: { color: '#ffffff' } });
    if (parentId) edges.add({ id: `${parentId}_${id}`, from: parentId, to: id });
  }
  updateGameStatus();
  network.fit({ animation: { duration: 300, easingFunction: 'easeOutQuad' } });

  if (last) {
    fetchWikiInfo(ans.Language);
    finalizeGame();
    showScore();
  }
}

/* ------------------------------------------------------------------
   Status bar (guesses & hints)
------------------------------------------------------------------ */
function updateGameStatus() {
  const guessIcons = '<span class="status-icon available"></span>'.repeat(maxGuesses - guesses.length) + '<span class="status-icon used"></span>'.repeat(guesses.length);
  const hintIcons = '<span class="status-icon available"></span>'.repeat(maxHints - hints) + '<span class="status-icon used"></span>'.repeat(hints);
  document.getElementById('guessesLeft').innerHTML = `Guesses: ${guessIcons}`;
  document.getElementById('hintsLeft').innerHTML = `Hints: ${hintIcons}`;
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

  const countdownEl = document.getElementById('countdown');
  const nextDay = new Date();
  nextDay.setHours(24, 0, 0, 0);
  const timer = setInterval(() => {
    const diff = nextDay - Date.now();
    if (diff <= 0) return clearInterval(timer);
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1_000);
    countdownEl.textContent = `Next game in: ${h}h ${m}m ${s}s`;
  }, 1_000);

  modal.show();
}

/* ------------------------------------------------------------------
   Toast helper
------------------------------------------------------------------ */
const showToast = msg => {
  const t = document.getElementById('toast');
  t.querySelector('.toast-body').textContent = msg;
  t.classList.remove('hide');
  t.classList.add('show');
  setTimeout(() => t.classList.replace('show', 'hide'), 2_750);
};

/* ------------------------------------------------------------------
   Event bindings
------------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', () => {
  // Attach handlers once DOM is ready
  document.getElementById('submitBtn').addEventListener('click', handleLanguageSubmission);
  document.getElementById('hintBtn').addEventListener('click', handleHintRequest);
  document.getElementById('languageInput').addEventListener('input', handleLanguageInput);

  // Start or restore today’s game
  initGame();
});
