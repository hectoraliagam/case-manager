// ui/modal/modal.form.js

import { createModal, openModal, closeModal } from "./modal.base.js";
import { ESTADOS, estadoLabel } from "../../helpers/states.js";

function autoResizeTextarea(ta) {
  ta.style.height = "auto";
  const max = window.innerHeight * 0.4;
  ta.style.height = Math.min(ta.scrollHeight, max) + "px";
  ta.style.overflowY = ta.scrollHeight > max ? "auto" : "hidden";
}

export function openFormModal(tipo, data = {}, onSave) {
  const modalObj = createModal();
  const title = data.id ? "Editar Caso" : `Nuevo Caso ${tipo}`;
  openModal(modalObj, title);
  modalObj.formFields.innerHTML = `
    <form id="modal-form">
      ${generateForm(tipo, data)}
      <div class="modal-actions">
        <button type="button" class="cancel-btn">Cancelar</button>
        <button type="submit" class="primary">Guardar</button>
      </div>
    </form>
  `;
  const form = modalObj.formFields.querySelector("#modal-form");
  form
    .querySelector(".cancel-btn")
    .addEventListener("click", () => closeModal(modalObj));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form
      .querySelectorAll("input, textarea")
      .forEach((f) => (f.value = f.value));
    const formData = new FormData(form);
    console.log("FormData entries:", [...formData.entries()]);
    if (onSave) onSave(formData);
    closeModal(modalObj);
  });
  modalObj.formFields.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const wrapper = e.currentTarget.closest(".field-wrapper");
      const field = wrapper.querySelector("input, textarea");
      if (field) {
        navigator.clipboard
          .writeText(field.value || "")
          .then(() => {
            btn.textContent = "✅";
            setTimeout(() => (btn.textContent = "📋"), 1000);
          })
          .catch(() => alert("Error al copiar al portapapeles"));
      }
    });
  });
  modalObj.formFields.querySelectorAll(".estado-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const estado = btn.dataset.estado;
      modalObj.formFields
        .querySelectorAll(".estado-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      modalObj.formFields.querySelector('input[name="estado"]').value = estado;
    });
  });
  const textareas = modalObj.formFields.querySelectorAll("textarea");
  textareas.forEach((ta) => {
    autoResizeTextarea(ta);
    ta.addEventListener("input", () => autoResizeTextarea(ta));
  });
  const observer = new ResizeObserver(() => {
    textareas.forEach(autoResizeTextarea);
  });
  observer.observe(modalObj.modalContent);
}

function generateForm(tipo, data = {}) {
  const isBbdd = tipo === "BBDD";
  return `
    <input type="hidden" name="id" value="${data.id || ""}">
    <input type="hidden" name="tipo" value="${tipo}">
    ${isBbdd ? input("ID Caso", "idCaso", data.idCaso, false, "number") : ""}
    ${input("Customer ID", "customerId", data.customerId, true, "number")}
    ${
      isBbdd
        ? `${input("Fecha Derivación", "fechaDerivacion", data.fechaDerivacion)}
           ${input("Fecha Cierre", "fechaCierre", data.fechaCierre)}`
        : input("Nro Ticket", "nroTicket", data.nroTicket, true, "number")
    }
    ${input("Nombre", "nombre", data.nombre, true)}
    ${input("DNI / RUC", "dniRuc", data.dniRuc, false, "number")}
    ${input("Teléfono", "telefono", data.telefono, false, "number")}
    ${input("Tecnología", "tecnologia", data.tecnologia)}
    ${input("Teléfono Fijo", "telefonoFijo", data.telefonoFijo, false, "number")}
    ${input("Dirección IP", "ip", data.ip)}
    ${input("SOT Provisión Fija", "sotProvision", data.sotProvision, false, "number")}
    ${
      isBbdd
        ? `${textarea("Problema Front", "problemaFront", data.problemaFront)}
           ${textarea("Problema Back", "problemaBack", data.problemaBack)}`
        : textarea("Problema", "problema", data.problema)
    }
    ${input("SOT Generada", "sotGenerada", data.sotGenerada, false, "number")}
    ${input("REMEDY Generada", "remedy", data.remedy)}
    ${textarea("Observaciones", "observaciones", data.observaciones)}
    ${isBbdd ? textarea("Plantilla", "plantilla", data.plantilla) : ""}
    <div class="field">
      <label>Estado</label>
      <div class="estado-options">
        ${ESTADOS.map(
          (e) => `
            <button type="button" class="estado-btn ${data.estado === e ? "active" : ""}" data-estado="${e}">
              ${estadoLabel(e)}
            </button>
          `,
        ).join("")}
        <input type="hidden" name="estado" value="${data.estado || "no-vista"}">
      </div>
    </div>
  `;
}

function input(label, name, value = "", required = false, type = "text") {
  return `
    <div class="field field-with-copy">
      <label>${label}</label>
      <div class="field-wrapper">
        <input 
          type="${type}" 
          name="${name}" 
          value="${value || ""}" 
          ${required ? "required" : ""} 
          autocomplete="off" 
          spellcheck="false"
        >
        <button type="button" class="copy-btn" title="Copiar">📋</button>
      </div>
    </div>
  `;
}

function textarea(label, name, value = "") {
  return `
    <div class="field field-textarea field-with-copy">
      <label>${label}</label>
      <div class="field-wrapper">
        <textarea 
          name="${name}" 
          rows="1" 
          autocomplete="off" 
          spellcheck="false"
        >${value || ""}</textarea>
        <button type="button" class="copy-btn" title="Copiar">📋</button>
      </div>
    </div>
  `;
}
