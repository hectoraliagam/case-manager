// app.js

import { initUI } from "./ui/ui.init.js";
import { renderCases } from "./ui/ui.render.js";
import { openFormModal } from "./ui/modal/modal.form.js";
import { openExportModal } from "./ui/modal/modal.export.js";
import { openImportModal } from "./ui/modal/modal.import.js";
import { handleFormSubmit } from "./data/cases.handler.js";

document.addEventListener("DOMContentLoaded", () => {
  initUI();
  const btnBbdd = document.getElementById("btn-new-bbdd");
  const btnTicket = document.getElementById("btn-new-ticket");
  const btnExport = document.getElementById("btn-export");
  const btnImport = document.getElementById("btn-import");
  const fileInput = document.getElementById("file-input");
  btnBbdd.addEventListener("click", () =>
    openFormModal("BBDD", {}, handleFormSubmit),
  );
  btnTicket.addEventListener("click", () =>
    openFormModal("TICKET", {}, handleFormSubmit),
  );
  btnExport.addEventListener("click", openExportModal);
  btnImport.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    openImportModal(file);
    e.target.value = "";
  });
  renderCases();
});
