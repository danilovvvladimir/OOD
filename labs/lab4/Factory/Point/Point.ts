class Point {
  private x: number = 0;
  private y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}

export default Point;
