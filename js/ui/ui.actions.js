import { loadCases, deleteCase } from "../data/cases.store.js";
import { openModal } from "./ui.modal.js";
import { renderCases } from "./ui.render.js";

export function editCase(id) {
  const c = loadCases().find((c) => c.id === id);
  if (c) openModal(c.tipo, c);
}

export function removeCase(id) {
  deleteCase(id);
  renderCases();
}
