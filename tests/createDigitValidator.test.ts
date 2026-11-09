import { describe, expect, it } from 'vitest';
import { createDigitValidator } from '../src/core/createDigitValidator';

describe('createDigitValidator', () => {
  it('accepts binary digits', () => {
    const isBinaryDigit = createDigitValidator(2);

    expect(isBinaryDigit('0')).toBe(true);
    expect(isBinaryDigit('1')).toBe(true);
  });

  it('rejects invalid binary digits', () => {
    const isBinaryDigit = createDigitValidator(2);

    expect(isBinaryDigit('2')).toBe(false);
    expect(isBinaryDigit('9')).toBe(false);
  });

  it('accepts octal digits', () => {
    const isOctalDigit = createDigitValidator(8);

    expect(isOctalDigit('0')).toBe(true);
    expect(isOctalDigit('7')).toBe(true);
  });

  it('rejects invalid octal digits', () => {
    const isOctalDigit = createDigitValidator(8);

    expect(isOctalDigit('8')).toBe(false);
    expect(isOctalDigit('9')).toBe(false);
  });

  it('accepts decimal digits', () => {
    const isDecimalDigit = createDigitValidator(10);

    expect(isDecimalDigit('0')).toBe(true);
    expect(isDecimalDigit('9')).toBe(true);
  });

  it('rejects non-decimal characters', () => {
    const isDecimalDigit = createDigitValidator(10);

    expect(isDecimalDigit('A')).toBe(false);
    expect(isDecimalDigit('G')).toBe(false);
  });

  it('accepts uppercase hexadecimal digits', () => {
    const isHexDigit = createDigitValidator(16);

    expect(isHexDigit('A')).toBe(true);
    expect(isHexDigit('F')).toBe(true);
  });

  it('accepts lowercase hexadecimal digits', () => {
    const isHexDigit = createDigitValidator(16);

    expect(isHexDigit('a')).toBe(true);
    expect(isHexDigit('f')).toBe(true);
  });

  it('rejects characters outside the hexadecimal range', () => {
    const isHexDigit = createDigitValidator(16);

    expect(isHexDigit('G')).toBe(false);
    expect(isHexDigit('Z')).toBe(false);
  });

  it('rejects an empty string', () => {
    const isHexDigit = createDigitValidator(16);

    expect(isHexDigit('')).toBe(false);
  });

  it('rejects strings containing multiple characters', () => {
    const isDecimalDigit = createDigitValidator(10);

    expect(isDecimalDigit('12')).toBe(false);
    expect(isDecimalDigit('10')).toBe(false);
  });

  it('rejects whitespace', () => {
    const isDecimalDigit = createDigitValidator(10);

    expect(isDecimalDigit(' ')).toBe(false);
  });

  it('creates independent validators for different bases', () => {
    const isBinaryDigit = createDigitValidator(2);
    const isHexDigit = createDigitValidator(16);

    expect(isBinaryDigit('A')).toBe(false);
    expect(isHexDigit('A')).toBe(true);
  });
});
