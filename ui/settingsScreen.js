import { countPossibleSecrets } from '../core/countPossibleSecrets.js';
import { getRecords } from '../core/records.js';
import { getSettingsLabel } from '../core/settings.js';
import { h } from './dom.js';
import { renderRecordsTable } from './recordsTable.js';
import { renderSettingsFields } from './settingsFields.js';
export function renderSettingsScreen(settings, records, onChange, onStart) {
    const total = countPossibleSecrets(settings.length, settings.base);
    const startButton = h('button', { type: 'button' }, 'Старт');
    startButton.onclick = () => onStart(settings);
    return h('div', {}, h('h1', {}, 'Bulls and Cows'), renderSettingsFields(settings, false, onChange), h('p', {}, `Возможных секретных чисел: ${total}`), startButton, h('h2', {}, `Рекорды (${getSettingsLabel(settings)})`), renderRecordsTable(getRecords(records, settings)));
}
