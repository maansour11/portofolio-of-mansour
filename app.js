const starterProjects = [
  { title: "Tafuta — Analyse d’offres IT", category: "Data & IA", year: "PFE · 2026", description: "Plateforme de collecte et d’analyse d’offres d’emploi IT. Pipeline NLP d’extraction des compétences, dashboards interactifs et chatbot d’analyse des tendances du marché.", visual: "TAFUTA\nIT JOB INTELLIGENCE", stack: "Python · Pandas · NLP · Streamlit · MongoDB · Plotly · AWS", link: "" },
  { title: "COSAU 2026 — Simulation continentale", category: "Engagement", year: "2026", description: "Représentation de la Tunisie au sein de la Commission Agriculture, Développement rural, Eau et Environnement. Rédaction de position papers et résolution en co-parrainage.", visual: "DIALOGUE\n& DIPLOMATIE", stack: "Leadership · Négociation · Communication", link: "" }
];
const storageKey = "portfolio-projects-v1";
let projects = loadProjects();
let activeFilter = "Tous";
const grid = document.querySelector("#project-grid");
const dialog = document.querySelector("#project-dialog");
const form = document.querySelector("#project-form");

function loadProjects() {
  try { const saved = localStorage.getItem(storageKey); return saved ? JSON.parse(saved) : starterProjects; }
  catch { return starterProjects; }
}
function saveProjects() { localStorage.setItem(storageKey, JSON.stringify(projects)); }
function safeUrl(value) {
  try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) ? url.href : ""; }
  catch { return ""; }
}
function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}
function renderProjects() {
  const visible = projects.filter(project => activeFilter === "Tous" || project.category === activeFilter);
  document.querySelector("#all-count").textContent = String(projects.length).padStart(2, "0");
  grid.innerHTML = visible.map((project, index) => {
    const image = safeUrl(project.image || "");
    const link = safeUrl(project.link || "");
    const title = escapeHtml(project.title);
    const destination = link ? `href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer"` : "";
    return `<article class="project-card">
      <div class="project-image">${image ? `<img src="${escapeHtml(image)}" alt="Visuel du projet ${title}" loading="lazy">` : `<div class="image-art"><span class="project-index">${String(index + 1).padStart(2, "0")} / ${String(visible.length).padStart(2, "0")}</span><span class="shape-circle"></span><span class="shape-square"></span><span class="image-title">${escapeHtml(project.visual || title)}</span></div>`}
      ${link ? `<a class="project-open" ${destination} aria-label="Ouvrir ${title}">↗</a>` : ""}</div>
      <div class="project-info"><div><h3>${title}</h3><p>${escapeHtml(project.year || "Projet personnel")}</p></div><span class="project-tag">${escapeHtml(project.category)}</span></div>
      <p class="project-description">${escapeHtml(project.description)}</p>${project.stack ? `<p class="project-stack">${escapeHtml(project.stack)}</p>` : ""}</article>`;
  }).join("");
  if (!visible.length) grid.innerHTML = `<p class="empty-state">Aucun projet dans cette catégorie pour le moment.</p>`;
}
document.querySelectorAll(".filter-chip").forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter-chip").forEach(item => item.classList.toggle("active", item === button));
  renderProjects();
}));
document.querySelector("#open-project-form").addEventListener("click", () => dialog.showModal());
document.querySelector("#close-project-form").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
form.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const project = { title: data.get("title").trim(), category: data.get("category"), year: data.get("year").trim(), description: data.get("description").trim(), link: safeUrl(data.get("link").trim()), image: safeUrl(data.get("image").trim()) };
  if (!project.title || !project.description) return;
  projects.unshift(project);
  saveProjects();
  activeFilter = "Tous";
  document.querySelectorAll(".filter-chip").forEach(item => item.classList.toggle("active", item.dataset.filter === "Tous"));
  renderProjects(); form.reset(); dialog.close();
  const toast = document.querySelector("#toast"); toast.textContent = "Projet ajouté à votre portfolio."; toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
});
const menuToggle = document.querySelector(".menu-toggle");
menuToggle.addEventListener("click", () => { const open = document.querySelector(".main-nav").classList.toggle("open"); menuToggle.setAttribute("aria-expanded", String(open)); });
document.querySelectorAll(".main-nav a").forEach(link => link.addEventListener("click", () => { document.querySelector(".main-nav").classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false"); }));
document.querySelector("#year").textContent = new Date().getFullYear();
renderProjects();
fetch("/api/profil")
  .then((response) => response.json())
  .then((profil) => {
    console.log(profil);
    // Ici, tu peux afficher profil.nom, profil.pays, etc.
  })
  .catch((error) => console.error("Erreur :", error));