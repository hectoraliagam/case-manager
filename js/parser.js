// parser.js

export function parseTxtCase(text) {
  const lines = text.split("\n");
  const data = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line.includes(":")) {
      i++;
      continue;
    }
    const [rawKey, ...rest] = line.split(":");
    const key = rawKey.trim();
    const value = rest.join(":").trim();
    // MULTILÍNEA
    if (value === "" && lines[i + 1]?.trim() === "<<<") {
      i += 2;
      const buffer = [];
      while (i < lines.length && lines[i].trim() !== ">>>") {
        buffer.push(lines[i]);
        i++;
      }
      data[mapKey(key)] = buffer.join("\n");
      i++;
      continue;
    }
    // UNA LÍNEA
    data[mapKey(key)] = value;
    i++;
  }
  data.tipo = data.tipo || "BBDD";
  data.id = crypto.randomUUID();
  return data;
}

function mapKey(key) {
  const map = {
    TIPO: "tipo",
    ID_CASO: "idCaso",
    CUSTOMER_ID: "customerId",
    FECHA_DERIVACION: "fechaDerivacion",
    FECHA_CIERRE: "fechaCierre",
    NRO_TICKET: "nroTicket",
    NOMBRE: "nombre",
    DNI_RUC: "dniRuc",
    TELEFONO: "telefono",
    TECNOLOGIA: "tecnologia",
    TELEFONO_FIJO: "telefonoFijo",
    IP: "ip",
    SOT_PROVISION: "sotProvision",
    ESTADO: "estado",
    PROBLEMA_FRONT: "problemaFront",
    PROBLEMA_BACK: "problemaBack",
    PROBLEMA: "problema",
    SOT_GENERADA: "sotGenerada",
    REMEDY: "remedy",
    OBSERVACIONES: "observaciones",
    PLANTILLA: "plantilla",
  };
  return map[key] || key.toLowerCase();
}

export function parseTxtCases(text) {
  return text
    .split(/--- CASO.*---/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map(parseTxtCase);
}
