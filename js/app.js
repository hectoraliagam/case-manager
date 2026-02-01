document.addEventListener("DOMContentLoaded", () => {
  initUI();
  const btnBbdd = document.getElementById("btn-new-bbdd");
  const btnTicket = document.getElementById("btn-new-ticket");
  const btnCancel = document.getElementById("btn-cancel");
  const btnImport = document.getElementById("btn-import");
  const btnExport = document.getElementById("btn-export");
  const fileInput = document.getElementById("file-input");
  const form = document.getElementById("case-form");
  const modal = document.getElementById("modal-overlay");
  btnBbdd.addEventListener("click", () => openModal("BBDD"));
  btnTicket.addEventListener("click", () => openModal("TICKET"));
  btnCancel.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // EXPORT MODE
    if (modalTitle.textContent.includes("Exportar")) {
      const formData = new FormData(form);
      const mode = formData.get("dateMode");
      let date;
      if (mode === "custom") {
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
    // NORMAL CASE SAVE
    const data = Object.fromEntries(new FormData(form));
    data.tipo = data.tipo || "BBDD";
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
  });
  // IMPORT TXT
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
  // EXPORT BUTTON
  btnExport.addEventListener("click", () => {
    openExportModal();
  });
  renderCases();
});

// HELPERS
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}
