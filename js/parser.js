function parseTxtCase(text) {
  const lines = text.split("\n");
  const data = {};
  lines.forEach((line) => {
    if (!line.includes(":")) return;
    const [key, ...rest] = line.split(":");
    const value = rest.join(":").trim();
    switch (key.trim()) {
      case "TIPO":
        data.tipo = value;
        break;
      case "ID_CASO":
        data.idCaso = value;
        break;
      case "CUSTOMER_ID":
        data.customerId = value;
        break;
      case "FECHA_DERIVACION":
        data.fechaDerivacion = value;
        break;
      case "FECHA_CIERRE":
        data.fechaCierre = value;
        break;
      case "NRO_TICKET":
        data.nroTicket = value;
        break;
      case "NOMBRE":
        data.nombre = value;
        break;
      case "DNI_RUC":
        data.dniRuc = value;
        break;
      case "TELEFONO":
        data.telefono = value;
        break;
      case "TECNOLOGIA":
        data.tecnologia = value;
        break;
      case "TELEFONO_FIJO":
        data.telefonoFijo = value;
        break;
      case "IP":
        data.ip = value;
        break;
      case "SOT_PROVISION":
        data.sotProvision = value;
        break;
      case "SOT_GENERADA":
        data.sotGenerada = value;
        break;
      case "REMEDY":
        data.remedy = value;
        break;
      case "PROBLEMA_FRONT":
        data.problemaFront = value;
        break;
      case "PROBLEMA_BACK":
        data.problemaBack = value;
        break;
      case "PROBLEMA":
        data.problema = value;
        break;
      case "OBSERVACIONES":
        data.observaciones = value;
        break;
      case "PLANTILLA":
        data.plantilla = value;
        break;
    }
  });
  data.tipo = data.tipo || "BBDD";
  data.id = crypto.randomUUID();
  return data;
}

function parseTxtCases(text) {
  const blocks = text
    .split(/--- CASO.*---/)
    .map((b) => b.trim())
    .filter(Boolean);
  return blocks.map(parseTxtCase);
}
