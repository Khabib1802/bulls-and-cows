import { generateSecret } from './core/generateSecret.js';
import { addGuess, createGame, isWon, type GameState } from './core/gameState.js';
import { addRecord, createRecord } from './core/records.js';
import { DEFAULT_SETTINGS, type Settings } from './core/settings.js';
import { renderGameScreen } from './ui/gameScreen.js';
import { renderSettingsScreen } from './ui/settingsScreen.js';
import { loadRecords, saveRecords } from './storage.js';

const app = document.createElement('div');
document.body.append(app);

let records = loadRecords();

function show(screen: HTMLElement): void {
  app.replaceChildren(screen);
  app.querySelector('input')?.focus();
}

function showSettings(settings: Settings): void {
  show(renderSettingsScreen(settings, records, showSettings, startGame));
}

function showGame(state: GameState): void {
  show(
    renderGameScreen(
      state,
      records,
      (guess) => makeGuess(state, guess),
      () => showSettings(state.settings),
    ),
  );
}

function makeGuess(state: GameState, guess: string): void {
  const newState = addGuess(state, guess, Date.now());

  if (isWon(newState)) {
    records = addRecord(records, newState.settings, createRecord(newState));
    saveRecords(records);
  }

  showGame(newState);
}

function startGame(settings: Settings): void {
  const secret = generateSecret(settings.length, settings.base);

  showGame(createGame(settings, secret, Date.now()));
}

showSettings(DEFAULT_SETTINGS);
