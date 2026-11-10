import { createDigitValidator } from './createDigitValidator.js';

export function isValidGuess(guess: string, length: number, base: number): boolean {
  const isValidDigit = createDigitValidator(base);
  const digits = guess.toUpperCase().split('');

  return guess.length === length && new Set(digits).size === length && digits.every(isValidDigit);
}
