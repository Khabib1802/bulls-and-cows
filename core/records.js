import { getAttempts, getDuration } from './gameState.js';
export const RECORDS_LIMIT = 10;
function getKey(settings) {
    return `${settings.length}:${settings.base}`;
}
function compareRecords(a, b) {
    return a.attempts - b.attempts || a.timeMs - b.timeMs;
}
export function getRecords(table, settings) {
    return table[getKey(settings)] ?? [];
}
export function addRecord(table, settings, entry) {
    const records = [...getRecords(table, settings), entry]
        .sort(compareRecords)
        .slice(0, RECORDS_LIMIT);
    return { ...table, [getKey(settings)]: records };
}
export function createRecord(state) {
    return { attempts: getAttempts(state), timeMs: getDuration(state) };
}
