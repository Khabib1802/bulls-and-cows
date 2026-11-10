import { getAttempts, getDuration } from './gameState.js';
import type { GameState } from './gameState.js';
import type { Settings } from './settings.js';

export interface RecordEntry {
  attempts: number;
  timeMs: number;
}

export type RecordsTable = Record<string, RecordEntry[]>;

export const RECORDS_LIMIT = 10;

function getKey(settings: Settings): string {
  return `${settings.length}:${settings.base}`;
}

function compareRecords(a: RecordEntry, b: RecordEntry): number {
  return a.attempts - b.attempts || a.timeMs - b.timeMs;
}

export function getRecords(table: RecordsTable, settings: Settings): RecordEntry[] {
  return table[getKey(settings)] ?? [];
}

export function addRecord(
  table: RecordsTable,
  settings: Settings,
  entry: RecordEntry,
): RecordsTable {
  const records = [...getRecords(table, settings), entry]
    .sort(compareRecords)
    .slice(0, RECORDS_LIMIT);

  return { ...table, [getKey(settings)]: records };
}

export function createRecord(state: GameState): RecordEntry {
  return { attempts: getAttempts(state), timeMs: getDuration(state) };
}
