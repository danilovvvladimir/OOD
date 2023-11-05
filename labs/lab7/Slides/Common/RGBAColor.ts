class RGBAColor {
  public readonly r: number;
  public readonly g: number;
  public readonly b: number;
  public readonly a: number;

  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  public toString(): string {
    return (
      "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")"
    );
  }
}

export default RGBAColor;
