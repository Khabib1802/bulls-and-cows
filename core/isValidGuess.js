import { createDigitValidator } from './createDigitValidator.js';
export function isValidGuess(guess, length, base) {
    const isValidDigit = createDigitValidator(base);
    const digits = guess.toUpperCase().split('');
    return guess.length === length && new Set(digits).size === length && digits.every(isValidDigit);
}
