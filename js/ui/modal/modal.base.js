// ui/modal/modal.base.js

export function createModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay hidden";
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  const modalTitle = document.createElement("h2");
  modalTitle.className = "modal-title";
  const formFields = document.createElement("div");
  formFields.className = "form-fields";
  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";
  modalContent.append(modalTitle, formFields, modalFooter);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  return { modal, modalTitle, formFields, modalFooter, modalContent };
}

export function openModal(modalObj, title) {
  const { modal, modalTitle, formFields, modalFooter } = modalObj;
  modal.classList.remove("hidden");
  modalTitle.textContent = title;
  formFields.innerHTML = "";
  modalFooter.innerHTML = "";
}

export function closeModal(modalObj) {
  const { modal, modalTitle, formFields, modalFooter } = modalObj;
  modal.classList.add("hidden");
  modalTitle.textContent = "";
  formFields.innerHTML = "";
  modalFooter.innerHTML = "";
}
