import { modal, modalTitle, formFields, modalFooter } from "../ui.init.js";
import { closeModal, setModalMode } from "./modal.base.js";

export function openConfirmModal({ title, message, onConfirm }) {
  const form = document.getElementById("case-form");
  modal.classList.remove("hidden");
  modalTitle.textContent = title;
  setModalMode("confirm");
  form.reset();
  form.onsubmit = null;
  formFields.innerHTML = `<p class="confirm-text">${message}</p>`;
  modalFooter.innerHTML = `
    <button type="button" id="confirm-cancel">Cancelar</button>
    <button type="submit" class="danger">Eliminar</button>
  `;
  modalFooter.className = "confirm-actions";
  modalFooter.classList.remove("hidden");
  form.onsubmit = (e) => {
    e.preventDefault();
    onConfirm();
    closeModal();
  };
  document.getElementById("confirm-cancel").onclick = closeModal;
}
