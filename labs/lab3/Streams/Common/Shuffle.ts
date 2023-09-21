function mulberry32(a: number) {
  return function () {
    let t: number = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
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
