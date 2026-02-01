// ui/modal/modal.confirm.js

import { createModal, openModal, closeModal } from "./modal.base.js";

export function openConfirmModal({ title, message, onConfirm }) {
  const modalObj = createModal();
  openModal(modalObj, title);
  modalObj.formFields.innerHTML = `<p class="confirm-text">${message}</p>`;
  modalObj.modalFooter.innerHTML = `
    <div class="modal-actions">
      <button type="button" class="cancel-btn">Cancelar</button>
      <button type="button" class="danger">Eliminar</button>
    </div>
  `;
  modalObj.modalFooter.querySelector(".cancel-btn").onclick = () =>
    closeModal(modalObj);
  modalObj.modalFooter.querySelector(".danger").onclick = () => {
    onConfirm();
    closeModal(modalObj);
  };
}
