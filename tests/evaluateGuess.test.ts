import { describe, expect, it } from 'vitest';
import { evaluateGuess } from '../src/core/evaluateGuess';

describe('evaluateGuess', () => {
  it('returns all bulls when the guess matches the secret exactly', () => {
    const result = evaluateGuess('1234', '1234');

    expect(result).toEqual({ bulls: 4, cows: 0 });
  });

  it('returns all cows when all digits are correct but positions are wrong', () => {
    const result = evaluateGuess('1234', '4321');

    expect(result).toEqual({ bulls: 0, cows: 4 });
  });

  it('returns mixed bulls and cows for a partially correct guess', () => {
    const result = evaluateGuess('4271', '1237');

    expect(result).toEqual({ bulls: 1, cows: 2 });
  });

  it('returns zero bulls and cows when no digits match', () => {
    const result = evaluateGuess('1234', '5678');

    expect(result).toEqual({ bulls: 0, cows: 0 });
  });

  it('counts only one bull when only one digit matches at the correct position', () => {
    const result = evaluateGuess('1234', '1567');

    expect(result).toEqual({ bulls: 1, cows: 0 });
  });

  it('counts only one cow when only one digit matches at the wrong position', () => {
    const result = evaluateGuess('1234', '5671');

    expect(result).toEqual({ bulls: 0, cows: 1 });
  });

  it('compares hexadecimal digits without case sensitivity', () => {
    const result = evaluateGuess('A3F', 'a3f');

    expect(result).toEqual({ bulls: 3, cows: 0 });
  });

  it('evaluates hexadecimal digits with different positions correctly', () => {
    const result = evaluateGuess('A3F', 'f3a');

    expect(result).toEqual({ bulls: 1, cows: 2 });
  });

  it('does not modify the input strings', () => {
    const secret = '1234';
    const guess = '1243';

    evaluateGuess(secret, guess);

    expect(secret).toBe('1234');
    expect(guess).toBe('1243');
  });
});
