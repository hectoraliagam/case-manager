// ui/modal/modal.export.js

import { createModal, openModal, closeModal } from "./modal.base.js";
import { formatDate } from "../../helpers/date.js";
import { exportAllCasesToTxt } from "../../exporter.js";

export function openExportModal() {
  const modalObj = createModal();
  openModal(modalObj, "Exportar anotaciones");
  modalObj.formFields.innerHTML = `
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
  modalObj.modalFooter.innerHTML = `
    <div class="modal-actions">
      <button type="button" class="cancel-btn">Cancelar</button>
      <button type="button" class="export-btn primary">Exportar</button>
    </div>
  `;
  modalObj.modalFooter.querySelector(".cancel-btn").onclick = () =>
    closeModal(modalObj);
  const radios = modalObj.formFields.querySelectorAll("input[name='dateMode']");
  const dateBox = modalObj.formFields.querySelector(".custom-date");
  const options = modalObj.formFields.querySelectorAll(".radio-option");
  radios.forEach((radio, i) =>
    radio.addEventListener("change", () => {
      options.forEach((o) => o.classList.remove("active"));
      options[i].classList.add("active");
      dateBox.classList.toggle("hidden", radio.value !== "custom");
    }),
  );
  modalObj.modalFooter.querySelector(".export-btn").onclick = () => {
    const formData = new FormData(
      modalObj.formFields.closest("form") || new FormData(),
    );
    let date;
    const dateMode = modalObj.formFields.querySelector(
      "input[name='dateMode']:checked",
    ).value;
    if (dateMode === "custom") {
      const custom = modalObj.formFields.querySelector(
        "input[name='customDate']",
      ).value;
      if (!custom) return alert("Selecciona una fecha");
      date = formatDate(custom);
    } else date = formatDate(new Date());
    exportAllCasesToTxt(date);
    closeModal(modalObj);
  };
}
