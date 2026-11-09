export function generateSecret(
  length: number,
  base: number,
  random: () => number = Math.random,
): string {
  const digits = '0123456789ABCDEF'.slice(0, base).split('');

  for (let i = 0; i < length; i += 1) {
    const randomIndex = i + Math.floor(random() * (base - i));

    [digits[i], digits[randomIndex]] = [digits[randomIndex], digits[i]];
  }

  return digits.slice(0, length).join('');
}
