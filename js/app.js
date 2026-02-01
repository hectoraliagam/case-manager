document.addEventListener("DOMContentLoaded", () => {
  initUI();
  const btnBbdd = document.getElementById("btn-new-bbdd");
  const btnTicket = document.getElementById("btn-new-ticket");
  const btnCancel = document.getElementById("btn-cancel");
  const btnImport = document.getElementById("btn-import");
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
    const data = Object.fromEntries(new FormData(form));
    data.tipo = data.tipo || "BBDD";
    let cases = loadCases();
    if (data.id) {
      cases = cases.map((c) =>
        c.id === data.id ? data : c
      );
    } else {
      data.id = crypto.randomUUID();
      cases.push(data);
    }
    saveCases(cases);
    closeModal();
    renderCases();
  });
  btnImport.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = parseTxtCase(reader.result);
      addCase(data);
      renderCases();
    };
    reader.readAsText(file);
  });
  renderCases();
});
