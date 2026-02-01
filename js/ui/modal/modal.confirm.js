// ui/modal/modal.confirm.js

import { modal, modalTitle, formFields, modalFooter } from "../ui.init.js";
import { closeModal, setModalMode, openModalOverlay } from "./modal.base.js";

export function openConfirmModal({ title, message, onConfirm }) {
  openModalOverlay(title);
  setModalMode("confirm");

  formFields.innerHTML = `<p class="confirm-text">${message}</p>`;
  modalFooter.innerHTML = `
    <div class="modal-actions">
      <button type="button" id="confirm-cancel">Cancelar</button>
      <button type="button" class="danger" id="confirm-yes">Eliminar</button>
    </div>
  `;

  document.getElementById("confirm-cancel").onclick = closeModal;
  document.getElementById("confirm-yes").onclick = () => {
    onConfirm();
    closeModal();
  };
}
