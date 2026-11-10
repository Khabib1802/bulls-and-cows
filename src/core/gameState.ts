import { evaluateGuess } from './evaluateGuess.js';
import type { Settings } from './settings.js';

export interface HistoryEntry {
  guess: string;
  bulls: number;
  cows: number;
}

export interface GameState {
  settings: Settings;
  secret: string;
  history: HistoryEntry[];
  startedAt: number;
  finishedAt: number | null;
}

export function createGame(settings: Settings, secret: string, now: number): GameState {
  return { settings, secret, history: [], startedAt: now, finishedAt: null };
}

export function isWon(state: GameState): boolean {
  return state.finishedAt !== null;
}

export function hasGuess(state: GameState, guess: string): boolean {
  return state.history.some((entry) => entry.guess === guess.toUpperCase());
}

export function addGuess(state: GameState, guess: string, now: number): GameState {
  if (isWon(state) || hasGuess(state, guess)) {
    return state;
  }

  const normalizedGuess = guess.toUpperCase();
  const { bulls, cows } = evaluateGuess(state.secret, normalizedGuess);
  const entry = { guess: normalizedGuess, bulls, cows };
  const finishedAt = bulls === state.settings.length ? now : null;

  return { ...state, history: [...state.history, entry], finishedAt };
}

export function getAttempts(state: GameState): number {
  return state.history.length;
}

export function getDuration(state: GameState): number {
  return state.finishedAt === null ? 0 : state.finishedAt - state.startedAt;
}
