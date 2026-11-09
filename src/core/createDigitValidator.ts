const DIGITS = '0123456789ABCDEF';

export function createDigitValidator(base: number): (char: string) => boolean {
  const allowedDigits = DIGITS.slice(0, base).toLowerCase();

  return (char: string): boolean => {
    return char.length === 1 && allowedDigits.includes(char.toLowerCase());
  };
}
