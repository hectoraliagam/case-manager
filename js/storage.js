const STORAGE_KEY = "case_manager_cases";

function loadCases() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCases(cases) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
}

function addCase(caseData) {
  const cases = loadCases();
  cases.push(caseData);
  saveCases(cases);
}

function deleteCase(id) {
  const cases = loadCases().filter((c) => c.id !== id);
  saveCases(cases);
}
