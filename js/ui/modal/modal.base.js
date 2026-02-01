import { modal, modalTitle, formFields, modalFooter } from "../ui.init.js";

export function setModalMode(mode) {
  const form = document.getElementById("case-form");
  form.dataset.mode = mode;
}

export function closeModal() {
  const form = document.getElementById("case-form");
  modal.classList.add("hidden");
  modalTitle.textContent = "";
  formFields.innerHTML = "";
  modalFooter.innerHTML = "";
  form.reset();
  form.onsubmit = null;
  delete form.dataset.mode;
}
