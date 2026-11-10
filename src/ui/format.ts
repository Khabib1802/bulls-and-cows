export function formatTime(timeMs: number): string {
  return `${(timeMs / 1000).toFixed(1)} с`;
}
