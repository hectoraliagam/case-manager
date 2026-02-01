import { container } from "./ui.init.js";
import { editCase, removeCase } from "./ui.actions.js";
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
    <h3>#${numero} - ${data.nombre || "Sin nombre"}</h3>
    <div class="case-meta">
      <div>${data.tipo}</div>
      <div>Customer ID: ${data.customerId || "-"}</div>
    </div>
    <div class="card-actions">
      <button data-edit="${data.id}">✏️</button>
      <button data-delete="${data.id}">🗑</button>
    </div>
  `;
  card.querySelector("[data-edit]").onclick = () => editCase(data.id);
  card.querySelector("[data-delete]").onclick = () => removeCase(data.id);
  container.appendChild(card);
}
