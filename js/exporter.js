function exportCaseToTxt(data) {
  let txt = `--- CASO ---\n`;
  txt += `TIPO: ${data.tipo}\n`;
  txt += `CASO: ${data.casoNumero || ""}\n`;
  if (data.tipo === "BBDD") {
    txt += `ID_CASO: ${data.idCaso || ""}\n`;
  }
  txt += `CUSTOMER_ID: ${data.customerId || ""}\n`;
  if (data.tipo === "TICKET") {
    txt += `NRO_TICKET: ${data.nroTicket || ""}\n`;
  }
  txt += `NOMBRE: ${data.nombre || ""}\n`;
  txt += `DNI_RUC: ${data.dniRuc || ""}\n`;
  txt += `TELEFONO: ${data.telefono || ""}\n`;
  txt += `TECNOLOGIA: ${data.tecnologia || ""}\n`;
  txt += `TELEFONO_FIJO: ${data.telefonoFijo || ""}\n`;
  txt += `IP: ${data.ip || ""}\n`;
  txt += `SOT_PROVISION: ${data.sotProvision || ""}\n`;
  txt += `SOT_GENERADA: ${data.sotGenerada || ""}\n`;
  txt += `REMEDY: ${data.remedy || ""}\n`;
  if (data.tipo === "BBDD") {
    txt += `PROBLEMA_FRONT: ${data.problemaFront || ""}\n`;
    txt += `PROBLEMA_BACK: ${data.problemaBack || ""}\n`;
    txt += `PLANTILLA: ${data.plantilla || ""}\n`;
  } else {
    txt += `PROBLEMA: ${data.problema || ""}\n`;
  }
  txt += `OBSERVACIONES: ${data.observaciones || ""}\n`;
  return txt;
}

function downloadTxt(content, filename) {
  const blob = new Blob([content], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

function exportAllCasesToTxt(date) {
  const cases = loadCases();
  if (!cases.length) return alert("No hay casos para exportar");
  let content = "";
  cases.forEach((c, i) => {
    content += exportCaseToTxt(c);
    if (i < cases.length - 1) {
      content += "\n--------------------------\n\n";
    }
  });
  const filename = `anotaciones-${date}.txt`;
  downloadTxt(content, filename);
}
