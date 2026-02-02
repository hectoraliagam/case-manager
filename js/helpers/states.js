// helpers/states.js

export const ESTADOS = ["no-vista", "pendiente", "cerrada", "no-aplica"];

export function estadoLabel(estado) {
  switch (estado) {
    case "no-vista":
      return "No vista";
    case "pendiente":
      return "Pendiente";
    case "cerrada":
      return "Cerrada";
    case "no-aplica":
      return "No aplica";
    default:
      return estado;
  }
}
