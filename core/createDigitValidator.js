const DIGITS = '0123456789ABCDEF';
export function createDigitValidator(base) {
    const allowedDigits = DIGITS.slice(0, base).toLowerCase();
    return (char) => {
        return char.length === 1 && allowedDigits.includes(char.toLowerCase());
    };
}
