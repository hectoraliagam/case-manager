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
  modalTitle.textContent = data.id ? "Editar Caso" : `Nuevo Caso ${tipo}`;
  formFields.innerHTML = generateForm(tipo, data);
}

function closeModal() {
  modal.classList.add("hidden");
  modalTitle.textContent = "";
  formFields.innerHTML = "";
}

function generateForm(tipo, data) {
  const isBbdd = tipo === "BBDD";
  return `
    <input type="hidden" name="id" value="${data.id || ""}">
    <input type="hidden" name="tipo" value="${tipo}">
    ${input("Nombre", "nombre", data.nombre, true)}
    ${input("Customer ID", "customerId", data.customerId)}
    ${isBbdd ? input("ID Caso", "idCaso", data.idCaso) : ""}
    ${!isBbdd ? input("Nro Ticket", "nroTicket", data.nroTicket) : ""}
    ${input("DNI / RUC", "dniRuc", data.dniRuc)}
    ${input("Teléfono", "telefono", data.telefono)}
    ${input("Teléfono Fijo", "telefonoFijo", data.telefonoFijo)}
    ${input("Tecnología", "tecnologia", data.tecnologia)}
    ${input("IP", "ip", data.ip)}
    ${input("SOT Provisión", "sotProvision", data.sotProvision)}
    ${input("SOT Generada", "sotGenerada", data.sotGenerada)}
    ${input("Remedy", "remedy", data.remedy)}
    ${
      isBbdd
        ? `
          ${textarea("Problema Front", "problemaFront", data.problemaFront)}
          ${textarea("Problema Back", "problemaBack", data.problemaBack)}
          ${input("Plantilla", "plantilla", data.plantilla)}
        `
        : textarea("Problema", "problema", data.problema)
    }
    ${textarea("Observaciones", "observaciones", data.observaciones)}
  `;
}

function input(label, name, value = "", required = false) {
  return `
    <label>${label}</label>
    <input 
      name="${name}" 
      value="${value || ""}" 
      ${required ? "required" : ""}
    >
  `;
}

function textarea(label, name, value = "") {
  return `
    <label>${label}</label>
    <textarea name="${name}">${value || ""}</textarea>
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

function openExportModal() {
  modal.classList.remove("hidden");
  modalTitle.textContent = "Exportar anotaciones";
  formFields.innerHTML = `
    <label>Fecha del archivo</label>
    <div style="margin-top: .5rem">
      <label>
        <input type="radio" name="dateMode" value="today" checked>
        Usar fecha actual
      </label>
    </div>
    <div style="margin-top: .5rem">
      <label>
        <input type="radio" name="dateMode" value="custom">
        Elegir fecha
      </label>
      <input type="date" name="customDate" style="margin-top:.3rem">
    </div>
  `;
}
