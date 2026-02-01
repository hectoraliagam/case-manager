// app.js refactorizado
import {
  loadCases,
  addCase,
  upsertCase, // nueva función que hay que agregar en cases.store.js
} from "./data/cases.store.js";
import { formatDate } from "./helpers/date.js";
import { initUI } from "./ui/ui.init.js";
import { renderCases } from "./ui/ui.render.js";
import { parseTxtCases } from "./parser.js";
import { exportAllCasesToTxt } from "./exporter.js";
import { openModal } from "./ui/modal/modal.form.js";
import { openExportModal } from "./ui/modal/modal.export.js";
import { closeModal } from "./ui/modal/modal.base.js";

document.addEventListener("DOMContentLoaded", () => {
  initUI();

  const btnBbdd = document.getElementById("btn-new-bbdd");
  const btnTicket = document.getElementById("btn-new-ticket");
  const btnCancel = document.getElementById("btn-cancel");
  const btnImport = document.getElementById("btn-import");
  const btnExport = document.getElementById("btn-export");
  const fileInput = document.getElementById("file-input");
  const form = document.getElementById("case-form");
  const modalOverlay = document.getElementById("modal-overlay");

  // BOTONES
  btnBbdd.addEventListener("click", () => openModal("BBDD"));
  btnTicket.addEventListener("click", () => openModal("TICKET"));
  btnExport.addEventListener("click", openExportModal);
  btnCancel.addEventListener("click", closeModal);

  // Cerrar modal si clic afuera
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // SUBMIT DEL FORMULARIO
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const mode = form.dataset.mode;

    if (mode === "form") handleFormSubmit();
    else if (mode === "export") handleExportSubmit();
    else if (mode === "confirm") handleConfirmSubmit();
  });

  // IMPORTAR
  btnImport.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", handleFileImport);

  // Render inicial
  renderCases();
});

// ---------- FUNCIONES ----------

// Crear o editar caso
function handleFormSubmit() {
  const form = document.getElementById("case-form");
  const data = Object.fromEntries(new FormData(form));
  data.tipo ||= "BBDD";

  if (!data.id) data.id = crypto.randomUUID(); // nuevo caso

  upsertCase(data); // actualiza o agrega según corresponda
  closeModal();
  renderCases(); // se ve inmediatamente
}

// Exportar casos
function handleExportSubmit() {
  const form = document.getElementById("case-form");
  const formData = new FormData(form);
  const dateMode = formData.get("dateMode");

  let date;
  if (dateMode === "custom") {
    const custom = formData.get("customDate");
    if (!custom) {
      alert("Selecciona una fecha");
      return;
    }
    date = formatDate(custom);
  } else {
    date = formatDate(new Date());
  }

  exportAllCasesToTxt(date);
  closeModal();
}

// Confirm modal (no necesita lógica especial aquí)
function handleConfirmSubmit() {
  // Solo cierra el modal, la acción se maneja en openConfirmModal
  closeModal();
}

// Importar archivo
function handleFileImport(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const cases = parseTxtCases(reader.result);
    cases.forEach((c) => upsertCase(c));
    renderCases();
  };
  reader.readAsText(file);
}
