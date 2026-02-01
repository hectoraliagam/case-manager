let container;
let modal;
let modalTitle;
let formFields;

function initUI() {
  container = document.getElementById("cases-container");
  modal = document.getElementById("modal-overlay");
  modalTitle = document.getElementById("modal-title");
  formFields = document.getElementById("form-fields");
  closeModal();
}

function renderCases() {
  container.innerHTML = "";
  loadCases().forEach(renderCaseCard);
}

function renderCaseCard(data) {
  const card = document.createElement("div");
  const tipo = (data.tipo || "BBDD").toLowerCase();
  card.className = `case-card ${tipo}`;
  card.innerHTML = `
    <h3>${data.nombre || "Sin nombre"}</h3>
    <div class="case-meta">
      <div>${data.tipo}</div>
      <div>Customer ID: ${data.customerId || "-"}</div>
    </div>
    <div class="card-actions">
      <button onclick="editCase('${data.id}')">✏️</button>
      <button onclick="removeCase('${data.id}')">🗑</button>
    </div>
  `;
  container.appendChild(card);
}

function openModal(tipo, data = {}) {
  modal.classList.remove("hidden");
  modalTitle.textContent = data.id
    ? "Editar Caso"
    : `Nuevo Caso ${tipo}`;
  formFields.innerHTML = generateForm(tipo, data);
}

function closeModal() {
  modal.classList.add("hidden");
  modalTitle.textContent = "";
  formFields.innerHTML = "";
}

function generateForm(tipo, data) {
  return `
    <input type="hidden" name="id" value="${data.id || ""}">
    <input type="hidden" name="tipo" value="${tipo}">
    <label>Nombre</label>
    <input name="nombre" required value="${data.nombre || ""}">
    <label>Customer ID</label>
    <input name="customerId" value="${data.customerId || ""}">
    <label>Observaciones</label>
    <textarea name="observaciones">${data.observaciones || ""}</textarea>
  `;
}

function editCase(id) {
  const c = loadCases().find((c) => c.id === id);
  if (!c) return;
  openModal(c.tipo, c);
}

function removeCase(id) {
  deleteCase(id);
  renderCases();
}
