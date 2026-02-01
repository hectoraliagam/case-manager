import { modal, modalTitle, formFields, modalFooter } from "../ui.init.js";
import { closeModal, setModalMode } from "./modal.base.js";

export function openExportModal() {
  const form = document.getElementById("case-form");
  modal.classList.remove("hidden");
  modalTitle.textContent = "Exportar anotaciones";
  setModalMode("export");
  form.reset();
  form.onsubmit = null;
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
    <button type="button" id="cancel-export">Cancelar</button>
    <button type="submit" class="primary">Exportar</button>
  `;
  modalFooter.classList.remove("hidden");
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
