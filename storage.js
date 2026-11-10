const STORAGE_KEY = 'bulls-and-cows-records';
export function loadRecords() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    }
    catch {
        return {};
    }
}
export function saveRecords(records) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
