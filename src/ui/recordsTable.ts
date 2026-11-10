import type { RecordEntry } from '../core/records.js';
import { h } from './dom.js';
import { formatTime } from './format.js';

function renderRow(record: RecordEntry, index: number): HTMLTableRowElement {
  return h(
    'tr',
    {},
    h('td', {}, String(index + 1)),
    h('td', {}, String(record.attempts)),
    h('td', {}, formatTime(record.timeMs)),
  );
}

export function renderRecordsTable(records: RecordEntry[]): HTMLElement {
  if (records.length === 0) {
    return h('p', {}, 'Пока нет результатов');
  }

  const header = h(
    'tr',
    {},
    h('th', {}, '#'),
    h('th', {}, 'Попытки'),
    h('th', {}, 'Время'),
  );

  return h('table', {}, header, ...records.map(renderRow));
}
