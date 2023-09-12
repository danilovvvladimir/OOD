export class Point {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

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
