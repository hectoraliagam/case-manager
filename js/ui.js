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
  loadCases().forEach((c, i) => renderCaseCard(c, i + 1));
}

function renderCaseCard(data, numero) {
  const card = document.createElement("div");
  const tipo = (data.tipo || "BBDD").toLowerCase();
  card.className = `case-card ${tipo}`;
  card.innerHTML = `
    <h3>#${numero} - ${data.nombre || "Sin nombre"}</h3>
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

function generateForm(tipo, data = {}) {
  const isBbdd = tipo === "BBDD";
  return `
    <input type="hidden" name="id" value="${data.id || ""}">
    <input type="hidden" name="tipo" value="${tipo}">
    ${isBbdd ? input("ID Caso", "idCaso", data.idCaso, false, "number") : ""}
    ${input("Customer ID", "customerId", data.customerId, false, "number")}
    ${
      isBbdd
        ? `
          ${input("Fecha Derivación", "fechaDerivacion", data.fechaDerivacion)}
          ${input("Fecha Cierre", "fechaCierre", data.fechaCierre)}
        `
        : input("Nro Ticket", "nroTicket", data.nroTicket, false, "number")
    }
    ${input("Nombre", "nombre", data.nombre, true)}
    ${input("DNI / RUC", "dniRuc", data.dniRuc, false, "number")}
    ${input("Teléfono", "telefono", data.telefono, false, "number")}
    ${input("Tecnología", "tecnologia", data.tecnologia)}
    ${input("Teléfono Fijo", "telefonoFijo", data.telefonoFijo, false, "number")}
    ${input("Dirección IP", "ip", data.ip)}
    ${input("SOT Provisión Fija", "sotProvision", data.sotProvision, false, "number")}
    ${
      isBbdd
        ? `
          ${textarea("Problema Front", "problemaFront", data.problemaFront)}
          ${textarea("Problema Back", "problemaBack", data.problemaBack)}
        `
        : textarea("Problema", "problema", data.problema)
    }
    ${input("SOT Generada", "sotGenerada", data.sotGenerada, false, "number")}
    ${input("REMEDY Generada", "remedy", data.remedy)}
    ${textarea("Observaciones", "observaciones", data.observaciones)}
    ${isBbdd ? textarea("Plantilla", "plantilla", data.plantilla) : ""}
  `;
}

function input(label, name, value = "", required = false, type = "text") {
  return `
    <div class="field">
      <label>${label}</label>
      <input 
        type="${type}" 
        name="${name}" 
        value="${value || ""}" 
        ${required ? "required" : ""}
      >
    </div>
  `;
}

function textarea(label, name, value = "") {
  return `
    <div class="field field-textarea">
      <label>${label}</label>
      <textarea name="${name}" rows="4">${value || ""}</textarea>
    </div>
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
