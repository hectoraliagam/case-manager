// ui/ui.render.js

import { container } from "./ui.init.js";
import { editCase, removeCaseConfirm } from "./ui.actions.js";
import { loadCases } from "../data/cases.store.js";

export function renderCases() {
  container.innerHTML = "";
  loadCases().forEach((c, i) => renderCaseCard(c, i + 1));
}

function renderCaseCard(data, numero) {
  const card = document.createElement("div");
  const tipo = (data.tipo || "BBDD").toLowerCase();
  card.className = `case-card ${tipo}`;
  card.innerHTML = `
    <div class="card-content">
      <h3>#${numero} - ${data.nombre || "Sin nombre"}</h3>
      <div class="case-meta">
        <span>${data.tipo}</span>
        <span>Customer ID: ${data.customerId || "-"}</span>
      </div>
    </div>
    <button class="btn-delete" title="Eliminar">🗑</button>
    <span class="case-status ${data.estado || "no-vista"}"></span>
  `;
  const content = card.querySelector(".card-content");
  const btnDelete = card.querySelector(".btn-delete");
  content.addEventListener("click", () => editCase(data.id));
  btnDelete.addEventListener("click", (e) => {
    e.stopPropagation();
    removeCaseConfirm(data.id);
  });
  container.appendChild(card);
}
