// app.js

import { loadCases, addCase, upsertCase } from "./data/cases.store.js";
import { formatDate } from "./helpers/date.js";
import { initUI } from "./ui/ui.init.js";
import { renderCases } from "./ui/ui.render.js";
import { parseTxtCases } from "./parser.js";
import { exportAllCasesToTxt } from "./exporter.js";
import { openFormModal } from "./ui/modal/modal.form.js";
import { openExportModal } from "./ui/modal/modal.export.js";
import { closeModal } from "./ui/modal/modal.base.js";

document.addEventListener("DOMContentLoaded", () => {
  initUI();

  const btnBbdd = document.getElementById("btn-new-bbdd");
  const btnTicket = document.getElementById("btn-new-ticket");
  const btnExport = document.getElementById("btn-export");
  const btnCancel = document.getElementById("btn-cancel");
  const btnImport = document.getElementById("btn-import");
  const fileInput = document.getElementById("file-input");
  const form = document.getElementById("case-form");
  const modalOverlay = document.getElementById("modal-overlay");

  // Abrir modales
  btnBbdd.addEventListener("click", () => openFormModal("BBDD"));
  btnTicket.addEventListener("click", () => openFormModal("TICKET"));
  btnExport.addEventListener("click", openExportModal);
  btnCancel.addEventListener("click", closeModal);

  // Cerrar modal al hacer click fuera del contenido
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Submit del form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const mode = form.dataset.mode;

    if (mode === "form") handleFormSubmit();
    else if (mode === "export") handleExportSubmit();
  });

  // Importar archivo
  btnImport.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", handleFileImport);

  // Render inicial de casos
  renderCases();
});

// Manejar submit del formulario
function handleFormSubmit() {
  const form = document.getElementById("case-form");
  const data = Object.fromEntries(new FormData(form));

  data.tipo ||= "BBDD";
  if (!data.id) data.id = crypto.randomUUID();

  upsertCase(data);
  closeModal();
  renderCases();
}

// Manejar exportación
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

// Manejar importación de archivo
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
