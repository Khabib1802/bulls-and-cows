import { createDigitValidator } from '../core/createDigitValidator.js';
import {
  getAttempts,
  getDuration,
  hasGuess,
  isWon,
  type GameState,
  type HistoryEntry,
} from '../core/gameState.js';
import { isValidGuess } from '../core/isValidGuess.js';
import { getRecords, type RecordsTable } from '../core/records.js';
import { getSettingsLabel } from '../core/settings.js';
import { h } from './dom.js';
import { formatTime } from './format.js';
import { renderRecordsTable } from './recordsTable.js';
import { renderSettingsFields } from './settingsFields.js';

function renderGuessForm(state: GameState, onGuess: (guess: string) => void): HTMLElement {
  const { length, base } = state.settings;
  const isValidDigit = createDigitValidator(base);
  const message = h('p', { className: 'message' });
  const input = h('input', { type: 'text', maxLength: length, placeholder: `${length} цифр` });
  const button = h('button', { type: 'submit' }, 'Попробовать');
  const form = h('form', {}, input, ' ', button, message);

  input.oninput = () => {
    input.value = [...input.value].filter(isValidDigit).join('');
    message.textContent = '';
  };

  form.onsubmit = (event) => {
    event.preventDefault();

    if (!isValidGuess(input.value, length, base)) {
      message.textContent = `Введите ${length} разных цифр`;
    } else if (hasGuess(state, input.value)) {
      message.textContent = 'Такая попытка уже была';
    } else {
      onGuess(input.value);
    }
  };

  return form;
}

function renderHistoryItem(entry: HistoryEntry): HTMLElement {
  return h('li', {}, `${entry.guess} — bulls: ${entry.bulls}, cows: ${entry.cows}`);
}

function renderHistory(state: GameState): HTMLElement {
  return h(
    'div',
    {},
    h('h2', {}, 'История попыток'),
    h('ol', {}, ...state.history.map(renderHistoryItem)),
  );
}

function renderResult(state: GameState, records: RecordsTable): HTMLElement {
  const attempts = getAttempts(state);
  const time = formatTime(getDuration(state));

  return h(
    'div',
    {},
    h(
      'p',
      { className: 'win' },
      `Вы угадали число ${state.secret}! Попыток: ${attempts}, время: ${time}`,
    ),
    h('h2', {}, `Рекорды (${getSettingsLabel(state.settings)})`),
    renderRecordsTable(getRecords(records, state.settings)),
  );
}

export function renderGameScreen(
  state: GameState,
  records: RecordsTable,
  onGuess: (guess: string) => void,
  onNewGame: () => void,
): HTMLElement {
  const newGameButton = h('button', { type: 'button' }, 'Новая игра');

  newGameButton.onclick = onNewGame;

  return h(
    'div',
    {},
    h('h1', {}, 'Bulls and Cows'),
    renderSettingsFields(state.settings, true, () => {}),
    isWon(state) ? renderResult(state, records) : renderGuessForm(state, onGuess),
    renderHistory(state),
    newGameButton,
  );
}
