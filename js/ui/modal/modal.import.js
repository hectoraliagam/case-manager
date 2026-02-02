// ui/modal/modal.import.js

import { createModal, openModal, closeModal } from "./modal.base.js";
import { parseTxtCases } from "../../parser.js";
import { saveCases, loadCases } from "../../data/cases.store.js";
import { renderCases } from "../ui.render.js";

export function openImportModal(file) {
  if (!file) return alert("Selecciona un archivo primero");
  const modalObj = createModal();
  openModal(modalObj, "Importar anotaciones");
  modalObj.formFields.innerHTML = `
    <form id="modal-import-form">
      <p>Elige cómo deseas importar los casos:</p>
      <label class="radio-option active">
        <input type="radio" name="importMode" value="merge" checked hidden>
        <strong>Agregar a los casos existentes</strong>
      </label>
      <label class="radio-option">
        <input type="radio" name="importMode" value="overwrite" hidden>
        <strong>Sobrescribir todos los casos</strong>
      </label>
      <div class="modal-actions">
        <button type="button" class="cancel-btn">Cancelar</button>
        <button type="submit" class="primary">Importar</button>
      </div>
    </form>
  `;
  const form = modalObj.formFields.querySelector("#modal-import-form");
  form.querySelector(".cancel-btn").onclick = () => closeModal(modalObj);
  const radios = form.querySelectorAll("input[name='importMode']");
  const options = form.querySelectorAll(".radio-option");
  radios.forEach((radio, i) =>
    radio.addEventListener("change", () => {
      options.forEach((o) => o.classList.remove("active"));
      options[i].classList.add("active");
    }),
  );
  form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const mode = formData.get("importMode");
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const importedCases = parseTxtCases(fileReader.result);
      if (mode === "overwrite") {
        saveCases(importedCases);
      } else {
        const existing = loadCases();
        saveCases([...existing, ...importedCases]);
      }
      renderCases();
      closeModal(modalObj);
    };
    fileReader.readAsText(file);
  };
}
