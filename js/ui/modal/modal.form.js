// ui/modal/modal.form.js

import { createModal, openModal, closeModal } from "./modal.base.js";

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
  modalObj.formFields.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const wrapper = e.currentTarget.closest(".field-wrapper");
      const field = wrapper.querySelector("input, textarea");
      if (field) {
        const valueToCopy = field.value || "";
        navigator.clipboard
          .writeText(valueToCopy)
          .then(() => {
            btn.textContent = "✅";
            setTimeout(() => (btn.textContent = "📋"), 1000);
          })
          .catch(() => alert("Error al copiar al portapapeles"));
      }
    });
  });
  const form = modalObj.formFields.querySelector("#modal-form");
  form.querySelector(".cancel-btn").onclick = () => closeModal(modalObj);
  form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    if (onSave) onSave(formData);
    closeModal(modalObj);
  };
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
  `;
}

function input(label, name, value = "", required = false, type = "text") {
  return `
    <div class="field field-with-copy">
      <label>${label}</label>
      <div class="field-wrapper">
        <input type="${type}" name="${name}" value="${value || ""}" ${required ? "required" : ""}>
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
        <textarea name="${name}" rows="4">${value || ""}</textarea>
        <button type="button" class="copy-btn" title="Copiar">📋</button>
      </div>
    </div>
  `;
}
