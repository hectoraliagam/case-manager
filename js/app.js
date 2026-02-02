// app.js

import { loadCases, upsertCase } from "./data/cases.store.js";
import { formatDate } from "./helpers/date.js";
import { initUI } from "./ui/ui.init.js";
import { renderCases } from "./ui/ui.render.js";
import { parseTxtCases } from "./parser.js";
import { exportAllCasesToTxt } from "./exporter.js";
import { openFormModal } from "./ui/modal/modal.form.js";
import { openExportModal } from "./ui/modal/modal.export.js";

document.addEventListener("DOMContentLoaded", () => {
  initUI();
  const btnBbdd = document.getElementById("btn-new-bbdd");
  const btnTicket = document.getElementById("btn-new-ticket");
  const btnExport = document.getElementById("btn-export");
  const btnImport = document.getElementById("btn-import");
  const fileInput = document.getElementById("file-input");
  btnBbdd.addEventListener("click", () =>
    openFormModal("BBDD", {}, handleFormSubmit)
  );
  btnTicket.addEventListener("click", () =>
    openFormModal("TICKET", {}, handleFormSubmit)
  );
  btnExport.addEventListener("click", openExportModal);
  btnImport.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", handleFileImport);
  renderCases();
});

function handleFormSubmit(formData) {
  const data = Object.fromEntries(formData);
  data.tipo ||= "BBDD";
  if (!data.id) data.id = crypto.randomUUID();
  upsertCase(data);
  renderCases();
}

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
