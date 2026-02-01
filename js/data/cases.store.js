const STORAGE_KEY = "case_manager_cases";

export function loadCases() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveCases(cases) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
}

export function addCase(caseData) {
  const cases = loadCases();
  cases.push(caseData);
  saveCases(cases);
}

export function deleteCase(id) {
  const cases = loadCases().filter((c) => c.id !== id);
  saveCases(cases);
}

export function upsertCase(caseData) {
  const cases = loadCases();
  const index = cases.findIndex((c) => c.id === caseData.id);
  if (index !== -1) {
    cases[index] = caseData;
  } else {
    cases.push(caseData);
  }
  saveCases(cases);
}
