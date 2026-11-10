import { describe, expect, it, vi } from 'vitest';
import { generateSecret } from '../src/core/generateSecret';

describe('generateSecret', () => {
  it('returns a secret with the requested length', () => {
    const result = generateSecret(2, 2);

    expect(result).toHaveLength(2);
  });

  it('generates only valid binary digits', () => {
    const result = generateSecret(2, 2);

    expect(result).toMatch(/^[01]+$/);
  });

  it('generates only valid octal digits', () => {
    const result = generateSecret(4, 8);

    expect(result).toMatch(/^[0-7]+$/);
  });

  it('generates only valid decimal digits', () => {
    const result = generateSecret(4, 10);

    expect(result).toMatch(/^[0-9]+$/);
  });

  it('generates only valid hexadecimal digits', () => {
    const result = generateSecret(4, 16);

    expect(result).toMatch(/^[0-9A-F]+$/i);
  });

  it('does not contain repeated digits', () => {
    const result = generateSecret(6, 10);

    expect(new Set(result).size).toBe(result.length);
  });

  it('allows zero as the first digit', () => {
    const randomValues = [0, 0.15, 0.25, 0.35];
    const random = vi.fn(() => randomValues.shift() ?? 0);

    const result = generateSecret(4, 10, random);

    expect(result[0]).toBe('0');
  });

  it('uses the injected random function', () => {
    const random = vi.fn(() => 0.5);

    generateSecret(4, 10, random);

    expect(random).toHaveBeenCalled();
  });

  it('produces the same result for independent identical random sequences', () => {
    const createRandom = () => {
      let seed = 0.1;

      return () => {
        seed = (seed + 0.23) % 1;
        return seed;
      };
    };

    const result1 = generateSecret(4, 10, createRandom());
    const result2 = generateSecret(4, 10, createRandom());

    expect(result1).toBe(result2);
  });

  it('generates a secret with unique digits when length equals base', () => {
    const result = generateSecret(2, 2);

    expect(new Set(result).size).toBe(2);
    expect(result).toMatch(/^[01]{2}$/);
  });
});
