const cache = new Map();
export function countPossibleSecrets(length, base) {
    if (length === 0) {
        return 1;
    }
    if (length > base || length < 0 || base < 0) {
        return 0;
    }
    const key = `${length}:${base}`;
    if (cache.has(key)) {
        return cache.get(key);
    }
    const result = base * countPossibleSecrets(length - 1, base - 1);
    cache.set(key, result);
    return result;
}
