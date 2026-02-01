// ui/modal/modal.export.js

import { modal, formFields, modalFooter } from "../ui.init.js";
import { setModalMode, closeModal, openModalOverlay } from "./modal.base.js";

export function openExportModal() {
  const form = document.getElementById("case-form");
  openModalOverlay("Exportar anotaciones");
  setModalMode("export");

  formFields.innerHTML = `
    <div class="export-box">
      <div class="export-options">
        <label class="radio-option active">
          <input type="radio" name="dateMode" value="today" checked hidden>
          <strong>Usar fecha actual</strong>
        </label>
        <label class="radio-option">
          <input type="radio" name="dateMode" value="custom" hidden>
          <strong>Elegir fecha</strong>
        </label>
        <div class="custom-date hidden">
          <input type="date" name="customDate">
        </div>
      </div>
    </div>
  `;
  modalFooter.innerHTML = `
    <div class="modal-actions">
      <button type="button" id="cancel-export">Cancelar</button>
      <button type="submit" class="primary">Exportar</button>
    </div>
  `;
  document.getElementById("cancel-export").onclick = closeModal;

  const radios = formFields.querySelectorAll("input[name='dateMode']");
  const dateBox = formFields.querySelector(".custom-date");
  const options = formFields.querySelectorAll(".radio-option");

  radios.forEach((radio, i) => {
    radio.addEventListener("change", () => {
      options.forEach((o) => o.classList.remove("active"));
      options[i].classList.add("active");
      dateBox.classList.toggle("hidden", radio.value !== "custom");
    });
  });
}
