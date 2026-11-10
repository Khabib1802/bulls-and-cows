import { countPossibleSecrets } from '../core/countPossibleSecrets.js';
import { getRecords, type RecordsTable } from '../core/records.js';
import { getSettingsLabel, type Settings } from '../core/settings.js';
import { h } from './dom.js';
import { renderRecordsTable } from './recordsTable.js';
import { renderSettingsFields } from './settingsFields.js';

export function renderSettingsScreen(
  settings: Settings,
  records: RecordsTable,
  onChange: (settings: Settings) => void,
  onStart: (settings: Settings) => void,
): HTMLElement {
  const total = countPossibleSecrets(settings.length, settings.base);
  const startButton = h('button', { type: 'button' }, 'Старт');

  startButton.onclick = () => onStart(settings);

  return h(
    'div',
    {},
    h('h1', {}, 'Bulls and Cows'),
    renderSettingsFields(settings, false, onChange),
    h('p', {}, `Возможных секретных чисел: ${total}`),
    startButton,
    h('h2', {}, `Рекорды (${getSettingsLabel(settings)})`),
    renderRecordsTable(getRecords(records, settings)),
  );
}
