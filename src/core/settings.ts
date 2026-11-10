export interface Settings {
  length: number;
  base: number;
}

export const MIN_LENGTH = 2;
export const MAX_LENGTH = 6;

export const ALL_LENGTHS = [2, 3, 4, 5, 6];

export const BASES = [
  { name: 'bin', base: 2 },
  { name: 'oct', base: 8 },
  { name: 'dec', base: 10 },
  { name: 'hex', base: 16 },
];

export const DEFAULT_SETTINGS: Settings = { length: 4, base: 10 };

export function isLengthAvailable(length: number, base: number): boolean {
  return length >= MIN_LENGTH && length <= MAX_LENGTH && length <= base;
}

export function changeBase(settings: Settings, base: number): Settings {
  const length = isLengthAvailable(settings.length, base) ? settings.length : MIN_LENGTH;

  return { length, base };
}

export function changeLength(settings: Settings, length: number): Settings {
  return { ...settings, length };
}

export function getSettingsLabel(settings: Settings): string {
  const baseName = BASES.find((item) => item.base === settings.base)?.name;

  return `${settings.length} цифр, ${baseName}`;
}
