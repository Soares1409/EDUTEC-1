/* ==========================================================================
   Geonexus — funções compartilhadas (render de cards, header ativo, etc.)
   ========================================================================== */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Marca o link do menu correspondente à página atual como .active */
function highlightActiveNav() {
  const current = document.body.getAttribute("data-page");
  document.querySelectorAll(".main-nav a[data-page]").forEach((link) => {
    if (link.getAttribute("data-page") === current) {
      link.classList.add("active");
    }
  });
}

function initialsOf(nome) {
  return nome
    .split(" ")
    .map((n) => n.charAt(0))
    .join("");
}

/* ---------- Templates de card (usados em várias páginas) ---------- */

function articleCardHTML(a) {
  return `
    <article class="glass article-card">
      <div class="article-card__media">
        <img src="${a.imagem}" alt="${escapeHtml(a.titulo)}" loading="lazy" width="800" height="560" />
      </div>
      <div class="article-card__body">
        <p class="article-card__cat">${escapeHtml(a.categoria)}</p>
        <h3 class="article-card__title">${escapeHtml(a.titulo)}</h3>
        <p class="article-card__summary">${escapeHtml(a.resumo)}</p>
        <p class="article-card__date">${escapeHtml(a.data)}</p>
      </div>
    </article>`;
}

function regionCardHTML(r) {
  return `
    <article class="glass region-card">
      <h2>${escapeHtml(r.nome)}</h2>
      <p>${escapeHtml(r.chamada)}</p>
      <div class="region-card__foot">
        <a class="btn btn-primary btn-small" href="regiao.html?slug=${encodeURIComponent(r.slug)}">Explorar</a>
        <span>${escapeHtml(r.paises)} países</span>
      </div>
    </article>`;
}

function pilarCardHTML(p) {
  return `
    <div class="glass card">
      <h3>${escapeHtml(p.titulo)}</h3>
      <p>${escapeHtml(p.texto)}</p>
    </div>`;
}

function teamCardHTML(p) {
  const avatarInner = p.foto
    ? `<img src="${escapeHtml(p.foto)}" alt="${escapeHtml(p.nome)}" loading="lazy" />`
    : escapeHtml(initialsOf(p.nome));
  return `
    <div class="glass team-card">
      <div class="avatar${p.foto ? " avatar--photo" : ""}">${avatarInner}</div>
      <p class="name">${escapeHtml(p.nome)}</p>
      <p class="role">${escapeHtml(p.papel)}</p>
    </div>`;
}

function highlightCardHTML(d) {
  return `
    <div class="glass highlight-card">
      <p class="label">${escapeHtml(d.titulo)}</p>
      <p class="text">${escapeHtml(d.texto)}</p>
    </div>`;
}

function articleMiniHTML(a) {
  const foto = a.imagem
    ? `<img src="${escapeHtml(a.imagem)}" alt="" loading="lazy" />`
    : "";
  return `
    <article class="glass article-mini">
      ${foto}
      <p class="title">${escapeHtml(a.titulo)}</p>
      <p class="summary">${escapeHtml(a.resumo)}</p>
      <p class="date">${escapeHtml(a.data)}</p>
    </article>`;
}

document.addEventListener("DOMContentLoaded", highlightActiveNav);
