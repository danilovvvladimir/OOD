function mulberry32(seed: number): () => number {
  let state = seed & 0xffffffff;
  const multiplier = 1 / 0xffffffff;

  return function () {
    state = (state ^ 0x5bd1e995) + state * 0x5bd1e995;
    state = state ^ (state >>> 15);
    state = state * 0x27d4eb2d;

    const result = state * multiplier;

    return result - Math.floor(result);
  };
}

export function shuffle(array: unknown[], key: number): unknown[] {
  let currentIndex: number = array.length;
  let randomIndex: number;

  while (currentIndex != 0) {
    randomIndex = Math.floor(mulberry32(key)() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
