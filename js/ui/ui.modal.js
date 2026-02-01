import { modal, modalTitle, formFields } from "./ui.init.js";
import { generateForm } from "./ui.form.js";

export function openModal(tipo, data = {}) {
  modal.classList.remove("hidden");
  modalTitle.textContent = data.id ? "Editar Caso" : `Nuevo Caso ${tipo}`;
  formFields.innerHTML = generateForm(tipo, data);
}

export function closeModal() {
  modal.classList.add("hidden");
  modalTitle.textContent = "";
  formFields.innerHTML = "";
}
