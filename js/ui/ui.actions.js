// ui/ui.actions.js

import { loadCases, deleteCase } from "../data/cases.store.js";
import { openModal } from "./modal/modal.form.js";
import { openConfirmModal } from "./modal/modal.confirm.js";
import { renderCases } from "./ui.render.js";

export function editCase(id) {
  const c = loadCases().find((c) => c.id === id);
  if (c) openModal(c.tipo, c);
}

export function removeCase(id) {
  deleteCase(id);
  renderCases();
}

export function removeCaseConfirm(id) {
  openConfirmModal({
    title: "Eliminar caso",
    message: "¿Seguro que deseas eliminar este caso?",
    onConfirm: () => removeCase(id),
  });
}
