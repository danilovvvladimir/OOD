export class Point {
  constructor(
    private x: number,
    private y: number,
  ) {}

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setX(newValue: number) {
    this.x = newValue;
  }

  setY(newValue: number) {
    this.y = newValue;
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
