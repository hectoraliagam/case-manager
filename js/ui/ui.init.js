// ui/ui.init.js

export let container;
export let modal;
export let modalTitle;
export let formFields;
export let modalFooter;

export function initUI() {
  container = document.getElementById("cases-container");
  modal = document.getElementById("modal-overlay");
  modalTitle = document.getElementById("modal-title");
  formFields = document.getElementById("form-fields");
  modalFooter = document.getElementById("modal-footer");
}
