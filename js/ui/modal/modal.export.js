import { createModal, openModal, closeModal } from "./modal.base.js";
import { formatDate } from "../../helpers/date.js";
import { exportAllCasesToTxt } from "../../exporter.js";

export function openExportModal() {
  const modalObj = createModal();
  openModal(modalObj, "Exportar anotaciones");
  modalObj.formFields.innerHTML = `
    <form id="modal-export-form">
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
      <div class="modal-actions">
        <button type="button" class="cancel-btn">Cancelar</button>
        <button type="submit" class="export-btn primary">Exportar</button>
      </div>
    </form>
  `;
  const form = modalObj.formFields.querySelector("#modal-export-form");
  form.querySelector(".cancel-btn").onclick = () => closeModal(modalObj);
  const radios = form.querySelectorAll("input[name='dateMode']");
  const options = form.querySelectorAll(".radio-option");
  const dateBox = form.querySelector(".custom-date");
  radios.forEach((radio, i) =>
    radio.addEventListener("change", () => {
      options.forEach((o) => o.classList.remove("active"));
      options[i].classList.add("active");
      dateBox.classList.toggle("hidden", radio.value !== "custom");
    })
  );
  form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const dateMode = formData.get("dateMode");
    let date;
    if (dateMode === "custom") {
      const custom = formData.get("customDate");
      if (!custom) return alert("Selecciona una fecha");
      date = formatDate(custom);
    } else {
      date = formatDate(new Date());
    }
    exportAllCasesToTxt(date);
    closeModal(modalObj);
  };
}
