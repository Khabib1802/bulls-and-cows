import { describe, expect, it } from 'vitest';
import { isValidGuess } from '../src/core/isValidGuess';

describe('isValidGuess', () => {
  it('returns true for a valid binary guess', () => {
    expect(isValidGuess('01', 2, 2)).toBe(true);
  });

  it('returns true for a valid octal guess', () => {
    expect(isValidGuess('5072', 4, 8)).toBe(true);
  });

  it('returns true for a valid decimal guess', () => {
    expect(isValidGuess('1928', 4, 10)).toBe(true);
  });

  it('returns true for a valid hexadecimal guess', () => {
    expect(isValidGuess('A3F9', 4, 16)).toBe(true);
  });

  it('returns false when the guess is shorter than the requested length', () => {
    expect(isValidGuess('123', 4, 10)).toBe(false);
  });

  it('returns false when the guess is longer than the requested length', () => {
    expect(isValidGuess('12345', 4, 10)).toBe(false);
  });

  it('returns false when the guess contains an invalid binary digit', () => {
    expect(isValidGuess('02', 2, 2)).toBe(false);
  });

  it('returns false when the guess contains an invalid octal digit', () => {
    expect(isValidGuess('128', 3, 8)).toBe(false);
  });

  it('returns false when the guess contains an invalid hexadecimal character', () => {
    expect(isValidGuess('A3G9', 4, 16)).toBe(false);
  });

  it('returns false when the guess contains repeated digits', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);
  });

  it('returns false when the guess contains repeated hexadecimal digits', () => {
    expect(isValidGuess('A3aF', 4, 16)).toBe(false);
  });

  it('accepts lowercase hexadecimal digits', () => {
    expect(isValidGuess('a3f9', 4, 16)).toBe(true);
  });

  it('accepts hexadecimal digits with mixed case', () => {
    expect(isValidGuess('a3F9', 4, 16)).toBe(true);
  });

  it('returns false for an empty string', () => {
    expect(isValidGuess('', 4, 10)).toBe(false);
  });

  it('returns false when the decimal guess contains a non-decimal character', () => {
    expect(isValidGuess('12A4', 4, 10)).toBe(false);
  });
});
