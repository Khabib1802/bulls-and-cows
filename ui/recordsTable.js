import { h } from './dom.js';
import { formatTime } from './format.js';
function renderRow(record, index) {
    return h('tr', {}, h('td', {}, String(index + 1)), h('td', {}, String(record.attempts)), h('td', {}, formatTime(record.timeMs)));
}
export function renderRecordsTable(records) {
    if (records.length === 0) {
        return h('p', {}, 'Пока нет результатов');
    }
    const header = h('tr', {}, h('th', {}, '#'), h('th', {}, 'Попытки'), h('th', {}, 'Время'));
    return h('table', {}, header, ...records.map(renderRow));
}
