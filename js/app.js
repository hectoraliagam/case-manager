import { loadCases, saveCases, addCase } from "./data/cases.store.js";
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
  btnBbdd.addEventListener("click", () => openModal("BBDD"));
  btnTicket.addEventListener("click", () => openModal("TICKET"));
  btnExport.addEventListener("click", openExportModal);
  btnCancel.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const mode = form.dataset.mode;
    if (mode === "confirm") return;
    if (mode === "export") {
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
      return;
    }
    if (mode === "form") {
      const data = Object.fromEntries(new FormData(form));
      data.tipo ||= "BBDD";
      let cases = loadCases();
      if (data.id) {
        cases = cases.map((c) => (c.id === data.id ? data : c));
      } else {
        data.id = crypto.randomUUID();
        cases.push(data);
      }
      saveCases(cases);
      closeModal();
      renderCases();
    }
  });
  btnImport.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const cases = parseTxtCases(reader.result);
      cases.forEach((c) => addCase(c));
      renderCases();
    };
    reader.readAsText(file);
  });
  renderCases();
});
