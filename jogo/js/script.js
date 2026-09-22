/* ==========================================================================
   GEONEXUS: GLOBAL CRISIS — Lógica do jogo
   ========================================================================== */

/* ---------- Ícones (SVG minimalistas, sem emojis) ---------- */
const ICON_PATHS = {
  economia: '<path d="M4 15c2-1 4-1 6 0s4 1 6 0" /><path d="M12 4v3M12 17v3" /><circle cx="12" cy="10.5" r="4.2" />',
  energia: '<path d="M12 3 5 13h5l-1 8 8-11h-5l1-7z" stroke-linejoin="round" />',
  diplomacia: '<circle cx="8" cy="9" r="3" /><circle cx="16" cy="9" r="3" /><path d="M3.5 19c.6-2.8 2.4-4.4 4.5-4.4s3.9 1.6 4.5 4.4M11.5 19c.6-2.8 2.4-4.4 4.5-4.4s3.9 1.6 4.5 4.4" />',
  seguranca: '<path d="M12 3.5 5 6v5.2c0 4.4 3 7.7 7 9.3 4-1.6 7-4.9 7-9.3V6l-7-2.5z" stroke-linejoin="round" /><path d="m9.3 12 1.9 1.9 3.6-3.8" />',
  tecnologia: '<rect x="6" y="6" width="12" height="12" rx="1.5" /><circle cx="12" cy="12" r="2.4" /><path d="M12 3v2.3M12 18.7V21M3 12h2.3M18.7 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6" />',
  estabilidade: '<path d="M12 3 20 7v5c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7l8-4z" stroke-linejoin="round" /><path d="M12 8v5M12 16v.5" />',
};

function iconSVG(key) {
  const path = ICON_PATHS[key] || "";
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">${path}</svg>`;
}

/* ---------- Estado global ---------- */
let state = null;

function createInitialState(country) {
  return {
    country,
    stats: { ...country.stats },
    initialStats: { ...country.stats },
    turn: 1,
    year: CONFIG.startYear,
    flags: {},
    cooldowns: {},
    usedMainEvents: [],
    usedConditionalEvents: [],
    lastFillerId: null,
    lastFillerCategory: null,
    decisionsCount: 0,
    crisesCount: 0,
    eventLog: [],
    currentEvent: null,
    gameOver: false,
  };
}

/* ---------- Utilitários ---------- */
function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function formatSigned(value) {
  const rounded = Math.round(value);
  if (rounded > 0) return `+${rounded}`;
  if (rounded < 0) return `${rounded}`;
  return "0";
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function switchScreen(id) {
  document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ---------- Inicialização ---------- */
function initGame() {
  renderCountryCards();
  renderFeatureCards();

  document.getElementById("btn-start").addEventListener("click", () => {
    switchScreen("screen-country");
  });

  document.getElementById("btn-back-to-start").addEventListener("click", () => {
    switchScreen("screen-start");
  });

  document.getElementById("btn-restart-final").addEventListener("click", restartGame);
  document.getElementById("btn-restart-gameover").addEventListener("click", restartGame);

  document.getElementById("btn-restart-ingame").addEventListener("click", () => {
    if (confirm("Deseja reiniciar a crise atual? Todo o progresso será perdido.")) {
      restartGame();
    }
  });
}

function renderFeatureCards() {
  const items = [
    { key: "economia", title: "Economia", text: "Equilibre crescimento, investimentos e risco fiscal." },
    { key: "energia", title: "Energia", text: "Garanta o abastecimento e a autonomia energética do país." },
    { key: "diplomacia", title: "Diplomacia", text: "Construa alianças e administre conflitos internacionais." },
    { key: "seguranca", title: "Segurança", text: "Proteja fronteiras, instituições e a ordem interna." },
  ];
  const container = document.getElementById("feature-grid");
  container.innerHTML = items
    .map(
      (item) => `
      <div class="glass card">
        <span class="card-icon">${iconSVG(item.key)}</span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>`
    )
    .join("");
}

function renderCountryCards() {
  const container = document.getElementById("country-grid");
  container.innerHTML = COUNTRIES.map(
    (c) => `
    <button class="glass region-card country-card-btn" data-id="${c.id}">
      <span class="country-flag">${c.flag}</span>
      <h2>${c.name}</h2>
      <p>${c.profile}</p>
      <div class="mini-stats-row">
        ${CONFIG.statKeys
          .map(
            (key) => `
          <div class="mini-stat">
            <span class="mini-stat-label">${STAT_META[key].label.slice(0, 3).toUpperCase()}</span>
            <div class="mini-stat-track"><div class="mini-stat-fill" style="width:${c.stats[key]}%"></div></div>
          </div>`
          )
          .join("")}
      </div>
      <div class="region-card__foot">
        <span class="link-accent">Selecionar país →</span>
      </div>
    </button>`
  ).join("");

  container.querySelectorAll(".country-card-btn").forEach((card) => {
    card.addEventListener("click", () => selectCountry(card.dataset.id));
  });
}

/* ---------- Seleção de país e início ---------- */
function selectCountry(countryId) {
  const country = COUNTRIES.find((c) => c.id === countryId);
  if (!country) return;
  startGame(country);
}

function startGame(country) {
  state = createInitialState(country);
  switchScreen("screen-game");
  renderGameHeader();
  renderStats(true);
  renderMap();
  nextTurn(true);
}

/* ---------- Cabeçalho / indicadores ---------- */
function renderGameHeader() {
  document.getElementById("hud-country").textContent = `${state.country.flag} ${state.country.name}`;
  document.getElementById("hud-stability").textContent = Math.round(state.stats.estabilidade);
  updateTurnDisplay();
}

function updateTurnDisplay() {
  document.getElementById("hud-year").textContent = state.year;
  document.getElementById("hud-turn").textContent = `${state.turn} / ${CONFIG.maxTurns}`;
}

function renderStats(initial = false) {
  const container = document.getElementById("indicators-grid");
  const allKeys = [...CONFIG.statKeys, "estabilidade"];

  if (initial) {
    container.innerHTML = allKeys
      .map(
        (key) => `
      <div class="indicator-card" data-key="${key}">
        <div class="indicator-top">
          <span class="indicator-icon">${iconSVG(key)}</span>
          <span class="indicator-name">${STAT_META[key].label}</span>
        </div>
        <div class="indicator-track"><div class="indicator-fill" style="width:${state.stats[key]}%"></div></div>
        <div class="indicator-bottom">
          <span class="indicator-value">${Math.round(state.stats[key])}</span>
          <span class="indicator-delta" data-delta></span>
        </div>
      </div>`
      )
      .join("");
    return;
  }

  allKeys.forEach((key) => {
    const card = container.querySelector(`.indicator-card[data-key="${key}"]`);
    if (card) card.querySelector(".indicator-fill").style.width = `${state.stats[key]}%`;
  });
}

function updateStats(changes) {
  const container = document.getElementById("indicators-grid");
  Object.keys(changes).forEach((key) => {
    const delta = changes[key];
    const card = container.querySelector(`.indicator-card[data-key="${key}"]`);
    if (!card) return;

    const fill = card.querySelector(".indicator-fill");
    const valueEl = card.querySelector(".indicator-value");
    const deltaEl = card.querySelector("[data-delta]");

    fill.style.width = `${state.stats[key]}%`;
    valueEl.textContent = Math.round(state.stats[key]);

    if (delta !== 0) {
      deltaEl.textContent = formatSigned(delta);
      deltaEl.className = "indicator-delta " + (delta > 0 ? "is-up" : "is-down");
      card.classList.remove("pulse-up", "pulse-down");
      void card.offsetWidth;
      card.classList.add(delta > 0 ? "pulse-up" : "pulse-down");
    }
  });

  const criticalKeys = Object.keys(state.stats).filter((k) => state.stats[k] < CONFIG.criticalThreshold);
  document.querySelectorAll(".indicator-card").forEach((card) => {
    card.classList.toggle("is-critical", criticalKeys.includes(card.dataset.key));
  });

  const stabilityEl = document.getElementById("hud-stability");
  if (stabilityEl) stabilityEl.textContent = Math.round(state.stats.estabilidade);
}

/* ---------- Mapa ---------- */
let selectedMapNode = null;

function renderMap() {
  const container = document.getElementById("map-nodes");
  container.innerHTML = COUNTRIES.map((c) => {
    const isPlayer = c.id === state.country.id;
    return `
      <button class="map-node ${isPlayer ? "is-player" : ""}" data-id="${c.id}"
        style="left:${c.coords.left}%; top:${c.coords.top}%;" title="${c.name}">
        <span class="map-node-dot"></span>
        <span class="map-node-label">${c.flag}</span>
      </button>`;
  }).join("");

  container.querySelectorAll(".map-node").forEach((node) => {
    node.addEventListener("click", () => showMapInfo(node.dataset.id));
  });

  showMapInfo(state.country.id);
}

function showMapInfo(countryId) {
  selectedMapNode = countryId;
  document.querySelectorAll(".map-node").forEach((n) => n.classList.toggle("is-selected", n.dataset.id === countryId));

  const country = COUNTRIES.find((c) => c.id === countryId);
  const meta = NATION_META[countryId];
  const panel = document.getElementById("map-info");

  if (countryId === state.country.id) {
    panel.innerHTML = `
      <p class="eyebrow-label">País controlado</p>
      <h4>${country.flag} ${country.name}</h4>
      <p class="map-info-text">${meta.strategic}</p>
      <p class="map-info-trade"><strong>Comércio:</strong> ${meta.trade}</p>`;
    return;
  }

  const relation = clamp(Math.round(state.stats.diplomacia * 0.7 + (100 - state.stats.seguranca) * 0.1));
  panel.innerHTML = `
    <p class="eyebrow-label">Relação diplomática</p>
    <h4>${country.flag} ${country.name}</h4>
    <div class="relation-track"><div class="relation-fill" style="width:${relation}%"></div></div>
    <p class="map-info-text">${meta.strategic}</p>
    <p class="map-info-trade"><strong>Comércio:</strong> ${meta.trade}</p>`;
}

/* ---------- Seleção e exibição de eventos ---------- */
function checkUnlockableEvents() {
  return CONDITIONAL_EVENTS.filter((ev) => {
    if (ev.cooldown) {
      const last = state.cooldowns[ev.id];
      if (last !== undefined && state.turn - last < ev.cooldown) return false;
    } else if (state.usedConditionalEvents.includes(ev.id)) {
      return false;
    }
    return ev.condition(state);
  });
}

function selectNextEvent() {
  // 1) Eventos condicionais desbloqueados pelo estado atual do país (prioridade)
  const available = checkUnlockableEvents();
  if (available.length > 0) return pickRandom(available);

  // 2) Eventos principais ainda não usados
  const mainPool = EVENTS.filter((ev) => !state.usedMainEvents.includes(ev.id));
  if (mainPool.length > 0) return pickRandom(mainPool);

  // 3) Eventos de preenchimento (evita repetir o mesmo do turno anterior)
  const fillerPool = FILLER_EVENTS.filter((ev) => ev.id !== state.lastFillerId);
  return pickRandom(fillerPool.length > 0 ? fillerPool : FILLER_EVENTS);
}

function showEvent(event) {
  state.currentEvent = event;

  if (CONDITIONAL_EVENTS.includes(event)) {
    if (event.cooldown) state.cooldowns[event.id] = state.turn;
    else state.usedConditionalEvents.push(event.id);
  } else if (EVENTS.includes(event)) {
    state.usedMainEvents.push(event.id);
  } else {
    state.lastFillerId = event.id;
  }

  if (event.isCrisis) state.crisesCount++;

  const panel = document.getElementById("event-panel");
  panel.classList.remove("event-enter");

  panel.innerHTML = `
    <div class="glass event-card ${event.critical ? "is-critical-event" : ""}">
      <p class="eyebrow-label">${event.critical ? "Alerta Crítico" : event.isCrisis ? "Crise em Andamento" : "Evento Internacional"} · Turno ${state.turn}</p>
      <h2 class="event-title">${event.title}</h2>
      <p class="event-description">${event.description}</p>
      <p class="event-context">${event.context}</p>
      <p class="event-question">Como seu governo deve reagir?</p>
      <div class="quiz-options">
        ${event.options
          .map(
            (opt, i) => `
          <button class="quiz-option" data-index="${i}">
            <span class="option-label">${opt.label}</span>
            <span class="option-effects">${effectsPreviewHTML(opt.effects)}</span>
          </button>`
          )
          .join("")}
      </div>
    </div>`;

  void panel.offsetWidth;
  panel.classList.add("event-enter");

  panel.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => makeDecision(parseInt(btn.dataset.index, 10)));
  });
}

function effectsPreviewHTML(effects) {
  return Object.keys(effects)
    .map((key) => {
      const val = effects[key];
      const cls = val > 0 ? "is-up" : val < 0 ? "is-down" : "";
      return `<span class="effect-chip ${cls}">${STAT_META[key].label} ${formatSigned(val)}</span>`;
    })
    .join("");
}

/* ---------- Decisão do jogador ---------- */
function makeDecision(optionIndex) {
  const event = state.currentEvent;
  const option = event.options[optionIndex];
  if (!option) return;

  state.decisionsCount++;

  if (option.setFlags) Object.assign(state.flags, option.setFlags);

  const changes = {};
  Object.keys(option.effects).forEach((key) => {
    const before = state.stats[key];
    state.stats[key] = clamp(before + option.effects[key]);
    changes[key] = state.stats[key] - before;
  });

  updateStats(changes);

  state.eventLog.push({
    turn: state.turn,
    year: state.year,
    title: event.title,
    choice: option.label,
    result: option.result,
  });

  document.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.disabled = true;
    const isChosen = parseInt(btn.dataset.index, 10) === optionIndex;
    btn.classList.add(isChosen ? "is-chosen" : "is-dim");
  });

  const panel = document.getElementById("event-panel");
  const card = panel.querySelector(".event-card");
  const consequence = document.createElement("div");
  consequence.className = "consequence-box";
  consequence.innerHTML = `
    <p class="eyebrow-label">Consequência</p>
    <p class="consequence-text">${option.result}</p>
    <button class="btn btn-primary" id="btn-continue">Avançar turno →</button>`;
  card.appendChild(consequence);

  requestAnimationFrame(() => consequence.classList.add("show"));

  document.getElementById("btn-continue").addEventListener("click", () => {
    advanceTurn();
  });

  renderHistoryPreview();
}

function renderHistoryPreview() {
  const list = document.getElementById("history-list");
  if (!list) return;
  const recent = state.eventLog.slice(-3).reverse();
  list.innerHTML = recent
    .map(
      (entry) => `
      <li>
        <span class="history-turn">${entry.year} · T${entry.turn}</span>
        <span class="history-title">${entry.title}</span>
        <span class="history-choice">${entry.choice}</span>
      </li>`
    )
    .join("");
}

/* ---------- Progressão de turno ---------- */
function applyStabilityDrift() {
  let change = 0;
  CONFIG.statKeys.forEach((key) => {
    const value = state.stats[key];
    if (value < CONFIG.criticalThreshold) change -= 4;
    else if (value < CONFIG.lowThreshold) change -= 2;
  });
  const allHealthy = CONFIG.statKeys.every((key) => state.stats[key] >= CONFIG.healthyThreshold);
  if (allHealthy) change += 2;

  if (change !== 0) {
    const before = state.stats.estabilidade;
    state.stats.estabilidade = clamp(before + change);
    updateStats({ estabilidade: state.stats.estabilidade - before });
  }
}

function advanceTurn() {
  applyStabilityDrift();

  if (checkGameOver()) return;

  if (state.turn >= CONFIG.maxTurns) {
    showFinalScreen();
    return;
  }

  state.turn++;
  if (state.turn % 2 === 1) state.year++;

  updateTurnDisplay();
  nextTurn(false);
}

function nextTurn(isFirst) {
  if (!isFirst && checkGameOver()) return;
  const event = selectNextEvent();
  showEvent(event);
}

/* ---------- Game over ---------- */
function checkGameOver() {
  if (state.stats.estabilidade <= 0) {
    showGameOverScreen();
    return true;
  }
  return false;
}

function showGameOverScreen() {
  state.gameOver = true;

  const weakStats = [...CONFIG.statKeys]
    .filter((key) => state.stats[key] < CONFIG.lowThreshold)
    .sort((a, b) => state.stats[a] - state.stats[b]);

  const factorsList =
    weakStats.length > 0
      ? weakStats
          .slice(0, 3)
          .map((key) => `<li>${STAT_META[key].label} colapsou para níveis insustentáveis (${Math.round(state.stats[key])}).</li>`)
          .join("")
      : `<li>Uma sucessão de crises mal administradas corroeu a confiança institucional.</li>`;

  const lastEvents = state.eventLog.slice(-3).reverse();
  const eventsList = lastEvents
    .map((e) => `<li><strong>${e.title}</strong> — ${e.choice}</li>`)
    .join("");

  document.getElementById("gameover-country").textContent = `${state.country.flag} ${state.country.name} · ${state.year}`;
  document.getElementById("gameover-factors").innerHTML = factorsList;
  document.getElementById("gameover-events").innerHTML =
    eventsList || "<li>Nenhum registro disponível.</li>";
  document.getElementById("gameover-summary").textContent = `Após ${state.decisionsCount} decisões e ${state.crisesCount} crises enfrentadas, a estabilidade nacional chegou a zero e as instituições do país deixaram de sustentar o governo.`;

  switchScreen("screen-gameover");
}

/* ---------- Tela final ---------- */
function generateNarrative() {
  const keys = CONFIG.statKeys;
  const final = state.stats;
  const sorted = [...keys].sort((a, b) => final[b] - final[a]);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  const openings = {
    economia: "Seu governo priorizou o crescimento econômico e a atração de investimentos",
    energia: "Seu governo priorizou a autonomia energética e a segurança do abastecimento nacional",
    diplomacia: "Seu governo priorizou a construção de alianças e o protagonismo diplomático",
    seguranca: "Seu governo priorizou o fortalecimento da segurança nacional e da defesa",
    tecnologia: "Seu governo priorizou investimentos em tecnologia e inovação",
  };

  const closings = {
    economia: "reduzindo a dependência externa e ampliando a capacidade produtiva do país.",
    energia: "reduzindo a dependência externa e aumentando a autonomia estratégica.",
    diplomacia: "consolidando parcerias que sustentaram o país nos momentos mais difíceis.",
    seguranca: "garantindo maior controle sobre ameaças internas e externas.",
    tecnologia: "posicionando o país entre as referências globais em inovação.",
  };

  const weaknessNotes = {
    economia: "Em contrapartida, a economia terminou o período fragilizada, exigindo atenção nos próximos anos.",
    energia: "Em contrapartida, a segurança energética permanece um ponto vulnerável.",
    diplomacia: "Em contrapartida, as relações internacionais do país se deterioraram ao longo da crise.",
    seguranca: "Em contrapartida, a segurança nacional ficou comprometida ao final do período.",
    tecnologia: "Em contrapartida, o país perdeu competitividade tecnológica frente aos demais.",
  };

  let narrative = `${openings[strongest]}, ${closings[strongest]}`;
  if (weakest !== strongest && final[weakest] < 55) {
    narrative += ` ${weaknessNotes[weakest]}`;
  }

  if (state.stats.estabilidade >= 75) {
    narrative += " O país encerra o período com sólida estabilidade institucional e confiança pública.";
  } else if (state.stats.estabilidade >= 45) {
    narrative += " A estabilidade nacional se manteve dentro de limites administráveis, apesar das turbulências.";
  } else {
    narrative += " Ainda assim, o país segue vulnerável, com a estabilidade interna sob pressão constante.";
  }

  return narrative;
}

function showFinalScreen() {
  const allKeys = [...CONFIG.statKeys, "estabilidade"];

  document.getElementById("final-country").textContent = `${state.country.flag} ${state.country.name}`;
  document.getElementById("final-year").textContent = state.year;

  const grid = document.getElementById("final-stats-grid");
  grid.innerHTML = allKeys
    .map((key) => {
      const initial = state.initialStats[key];
      const final = state.stats[key];
      const diff = Math.round(final - initial);
      const cls = diff > 0 ? "delta--up" : "";
      return `
      <div class="glass stat-card">
        <p class="label">${STAT_META[key].label}</p>
        <p class="value value--accent">${Math.round(final)}</p>
        <p class="delta ${cls}">${formatSigned(diff)} desde o início</p>
      </div>`;
    })
    .join("");

  document.getElementById("final-decisions").textContent = state.decisionsCount;
  document.getElementById("final-crises").textContent = state.crisesCount;
  document.getElementById("final-narrative").textContent = generateNarrative();

  switchScreen("screen-final");
}

/* ---------- Reinício ---------- */
function restartGame() {
  state = null;
  switchScreen("screen-start");
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", initGame);
