// ui/modal/modal.form.js

import { modal, formFields, modalFooter } from "../ui.init.js";
import { setModalMode, closeModal, openModalOverlay } from "./modal.base.js";

export function openFormModal(tipo, data = {}) {
  const form = document.getElementById("case-form");
  const title = data.id ? "Editar Caso" : `Nuevo Caso ${tipo}`;
  openModalOverlay(title);
  setModalMode("form");

  formFields.innerHTML = generateForm(tipo, data);
  modalFooter.innerHTML = `
    <div class="modal-actions">
      <button type="button" id="cancel-modal">Cancelar</button>
      <button type="submit" class="primary">Guardar</button>
    </div>
  `;

  document.getElementById("cancel-modal").onclick = closeModal;
}

function generateForm(tipo, data = {}) {
  const isBbdd = tipo === "BBDD";
  return `
    <input type="hidden" name="id" value="${data.id || ""}">
    <input type="hidden" name="tipo" value="${tipo}">
    ${isBbdd ? input("ID Caso", "idCaso", data.idCaso, false, "number") : ""}
    ${input("Customer ID", "customerId", data.customerId, true, "number")}
    ${isBbdd
      ? `${input("Fecha Derivación", "fechaDerivacion", data.fechaDerivacion)}
         ${input("Fecha Cierre", "fechaCierre", data.fechaCierre)}`
      : input("Nro Ticket", "nroTicket", data.nroTicket, true, "number")}
    ${input("Nombre", "nombre", data.nombre, true)}
    ${input("DNI / RUC", "dniRuc", data.dniRuc, false, "number")}
    ${input("Teléfono", "telefono", data.telefono, false, "number")}
    ${input("Tecnología", "tecnologia", data.tecnologia)}
    ${input("Teléfono Fijo", "telefonoFijo", data.telefonoFijo, false, "number")}
    ${input("Dirección IP", "ip", data.ip)}
    ${input("SOT Provisión Fija", "sotProvision", data.sotProvision, false, "number")}
    ${isBbdd
      ? `${textarea("Problema Front", "problemaFront", data.problemaFront)}
         ${textarea("Problema Back", "problemaBack", data.problemaBack)}`
      : textarea("Problema", "problema", data.problema)}
    ${input("SOT Generada", "sotGenerada", data.sotGenerada, false, "number")}
    ${input("REMEDY Generada", "remedy", data.remedy)}
    ${textarea("Observaciones", "observaciones", data.observaciones)}
    ${isBbdd ? textarea("Plantilla", "plantilla", data.plantilla) : ""}
  `;
}

function input(label, name, value = "", required = false, type = "text") {
  return `
    <div class="field">
      <label>${label}</label>
      <input type="${type}" name="${name}" value="${value || ""}" ${required ? "required" : ""}>
    </div>
  `;
}

function textarea(label, name, value = "") {
  return `
    <div class="field field-textarea">
      <label>${label}</label>
      <textarea name="${name}" rows="4">${value || ""}</textarea>
    </div>
  `;
}
