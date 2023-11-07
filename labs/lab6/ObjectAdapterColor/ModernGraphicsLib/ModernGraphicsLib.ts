export namespace ModernGraphicsLib {
  export class Point {
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    public x: number;
    public y: number;
  }

  export class RGBAColor {
    //readonly поля
    public r: number;
    public g: number;
    public b: number;
    public a: number;

    constructor(r: number, g: number, b: number, a: number) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }
  }

  export interface IModernGraphicsRenderer {
    beginDraw(): void;
    drawLine(start: Point, end: Point, color: RGBAColor): void;
    endDraw(): void;
  }

  export class ModernGraphicsRenderer implements IModernGraphicsRenderer {
    private drawing: boolean = false;
    private readonly COLOR_PRECISION: number = 2;

    public beginDraw(): void {
      if (this.drawing) {
        throw new Error("Drawing has already begun");
      }

      console.log("<draw>");
      this.drawing = true;
    }

    public drawLine(start: Point, end: Point, color: RGBAColor) {
      if (!this.drawing) {
        throw new Error(
          "DrawLine is allowed between BeginDraw()/EndDraw() only",
        );
      }

      console.log(
        `<line fromX=${start.x} fromY=${start.y} toX=${end.x} toY=${end.y}>`,
        `<color r=${color.r.toPrecision(
          this.COLOR_PRECISION,
        )} g=${color.g.toPrecision(
          this.COLOR_PRECISION,
        )} b=${color.b.toPrecision(
          this.COLOR_PRECISION,
        )} a=${color.a.toPrecision(this.COLOR_PRECISION)}>`,
        `<line/>`,
      );
    }

    public endDraw(): void {
      if (!this.drawing) {
        throw new Error("Drawing has not been started");
      }

      console.log("</draw>");
      this.drawing = false;
    }
  }
}
