import { describe, expect, it } from 'vitest';
import { countPossibleSecrets } from '../src/core/countPossibleSecrets';

describe('countPossibleSecrets', () => {
  it('returns 2 for binary secrets of length 2', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  it('returns 90 for decimal secrets of length 2', () => {
    expect(countPossibleSecrets(2, 10)).toBe(90);
  });

  it('returns 720 for decimal secrets of length 3', () => {
    expect(countPossibleSecrets(3, 10)).toBe(720);
  });

  it('returns 43680 for hexadecimal secrets of length 4', () => {
    expect(countPossibleSecrets(4, 16)).toBe(43680);
  });

  it('returns 1 when length is zero', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  it('returns 0 when length exceeds base', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
  });

  it('returns factorial of base when length equals base', () => {
    expect(countPossibleSecrets(3, 3)).toBe(6);
  });

  it('returns the same result for repeated calls', () => {
    const firstResult = countPossibleSecrets(4, 10);
    const secondResult = countPossibleSecrets(4, 10);

    expect(secondResult).toBe(firstResult);
  });

  it('returns 1 when length and base are both zero', () => {
    expect(countPossibleSecrets(0, 0)).toBe(1);
  });
});
