export interface EvaluationResult {
  bulls: number;
  cows: number;
}

export function evaluateGuess(secret: string, guess: string): EvaluationResult {
  const normalizedSecret = secret.toUpperCase();
  const normalizedGuess = guess.toUpperCase();

  const bulls = normalizedGuess
    .split('')
    .filter((digit, index) => digit === normalizedSecret[index]).length;

  const matchingDigits = normalizedGuess
    .split('')
    .filter((digit) => normalizedSecret.includes(digit));

  const cows = matchingDigits.length - bulls;

  return { bulls, cows };
}
