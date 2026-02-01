import { loadCases } from "./data/cases.store.js";

function block(key, value) {
  return `${key}:\n<<<\n` + `${value ? value.trim() : ""}\n` + `>>>\n`;
}

function line(key, value) {
  return `${key}: ${value || ""}\n`;
}

function exportCaseToTxt(data, numero) {
  let txt = `--- CASO ${numero} ---\n`;
  txt += line("TIPO", data.tipo);
  if (data.tipo === "BBDD") {
    txt += line("ID_CASO", data.idCaso);
  }
  txt += line("CUSTOMER_ID", data.customerId);
  if (data.tipo === "BBDD") {
    txt += line("FECHA_DERIVACION", data.fechaDerivacion);
    txt += line("FECHA_CIERRE", data.fechaCierre);
  } else {
    txt += line("NRO_TICKET", data.nroTicket);
  }
  txt += line("NOMBRE", data.nombre);
  txt += line("DNI_RUC", data.dniRuc);
  txt += line("TELEFONO", data.telefono);
  txt += line("TECNOLOGIA", data.tecnologia);
  txt += line("TELEFONO_FIJO", data.telefonoFijo);
  txt += line("IP", data.ip);
  txt += line("SOT_PROVISION", data.sotProvision);
  if (data.tipo === "BBDD") {
    txt += block("PROBLEMA_FRONT", data.problemaFront);
    txt += block("PROBLEMA_BACK", data.problemaBack);
  } else {
    txt += block("PROBLEMA", data.problema);
  }
  txt += line("SOT_GENERADA", data.sotGenerada);
  txt += line("REMEDY", data.remedy);
  txt += block("OBSERVACIONES", data.observaciones);
  if (data.tipo === "BBDD") {
    txt += block("PLANTILLA", data.plantilla);
  }
  return txt;
}

function downloadTxt(content, filename) {
  const blob = new Blob([content], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function exportAllCasesToTxt(date) {
  const cases = loadCases();
  if (!cases.length) {
    alert("No hay casos para exportar");
    return;
  }
  let content = "";
  cases.forEach((c, i) => {
    content += exportCaseToTxt(c, i + 1);
    if (i < cases.length - 1) {
      content += "\n--------------------------\n\n";
    }
  });
  downloadTxt(content, `anotaciones-${date}.txt`);
}
