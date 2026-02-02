// data/cases.handler.js

import { upsertCase } from "./cases.store.js";
import { renderCases } from "../ui/ui.render.js";

export function handleFormSubmit(formData) {
  const data = Object.fromEntries(formData);
  data.tipo ||= "BBDD";
  if (!data.id) data.id = crypto.randomUUID();
  upsertCase(data);
  renderCases();
}
