import { evaluateGuess } from './evaluateGuess.js';
export function createGame(settings, secret, now) {
    return { settings, secret, history: [], startedAt: now, finishedAt: null };
}
export function isWon(state) {
    return state.finishedAt !== null;
}
export function hasGuess(state, guess) {
    return state.history.some((entry) => entry.guess === guess.toUpperCase());
}
export function addGuess(state, guess, now) {
    if (isWon(state) || hasGuess(state, guess)) {
        return state;
    }
    const normalizedGuess = guess.toUpperCase();
    const { bulls, cows } = evaluateGuess(state.secret, normalizedGuess);
    const entry = { guess: normalizedGuess, bulls, cows };
    const finishedAt = bulls === state.settings.length ? now : null;
    return { ...state, history: [...state.history, entry], finishedAt };
}
export function getAttempts(state) {
    return state.history.length;
}
export function getDuration(state) {
    return state.finishedAt === null ? 0 : state.finishedAt - state.startedAt;
}
