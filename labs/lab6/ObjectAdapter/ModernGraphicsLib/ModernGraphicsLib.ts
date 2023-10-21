export namespace ModernGraphicsLib {
  export class Point {
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    public x: number;
    public y: number;
  }

  export interface IModernGraphicsRenderer {
    beginDraw(): void;
    drawLine(start: Point, end: Point): void;
    endDraw(): void;
  }

  export class ModernGraphicsRenderer implements IModernGraphicsRenderer {
    private drawing: boolean = false;

    // constructor() {}

    public beginDraw(): void {
      if (this.drawing) {
        throw new Error("Drawing has already begun");
      }

      console.log("<draw>");
      this.drawing = true;
    }

    public drawLine(start: Point, end: Point) {
      if (!this.drawing) {
        throw new Error(
          "DrawLine is allowed between BeginDraw()/EndDraw() only",
        );
      }

      console.log(
        `  <line fromX=${start.x} fromY=${start.y} toX=${end.x} toY=${end.y} />`,
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
