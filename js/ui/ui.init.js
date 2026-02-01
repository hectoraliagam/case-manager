export let container;
export let modal;
export let modalTitle;
export let formFields;

export function initUI() {
  container = document.getElementById("cases-container");
  modal = document.getElementById("modal-overlay");
  modalTitle = document.getElementById("modal-title");
  formFields = document.getElementById("form-fields");
}
