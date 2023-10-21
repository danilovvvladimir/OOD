import { GraphicsLib } from "../GraphicsLib/Graphlib";

export namespace ShapeDrawingLib {
  export class Point {
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    public x: number;
    public y: number;
  }

  export interface ICanvasDrawable {
    draw(canvas: GraphicsLib.ICanvas): void;
  }

  export class CTriangle implements ICanvasDrawable {
    private points: Point[];

    constructor(points: Point[]) {
      if (points.length !== 3) {
        throw new Error("Incorrect points count. Points count should be 3");
      }

      this.points = points;
    }

    public draw(canvas: GraphicsLib.ICanvas) {
      canvas.moveTo(this.points[0].x, this.points[0].y);
      canvas.lineTo(this.points[1].x, this.points[1].y);
      canvas.lineTo(this.points[2].x, this.points[2].y);
      canvas.lineTo(this.points[0].x, this.points[0].y);
    }
  }

  export class CRectangle implements ICanvasDrawable {
    private leftTopPoint: Point;
    private width: number;
    private height: number;

    constructor(leftTopPoint: Point, width: number, height: number) {
      if (width < 0) {
        throw new Error("Width can not be negative number");
      }
      if (height < 0) {
        throw new Error("Height can not be negative number");
      }

      this.leftTopPoint = leftTopPoint;
      this.width = width;
      this.height = height;
    }

    public draw(canvas: GraphicsLib.ICanvas): void {
      canvas.moveTo(this.leftTopPoint.x, this.leftTopPoint.y);
      canvas.lineTo(this.leftTopPoint.x + this.width, this.leftTopPoint.y);
      canvas.lineTo(
        this.leftTopPoint.x + this.width,
        this.leftTopPoint.y + this.height,
      );
      canvas.lineTo(this.leftTopPoint.x, this.leftTopPoint.y + this.height);
      canvas.lineTo(this.leftTopPoint.x, this.leftTopPoint.y);
    }
  }

  export class CanvasPainter {
    private canvas: GraphicsLib.ICanvas;

    constructor(canvas: GraphicsLib.ICanvas) {
      this.canvas = canvas;
    }

    public draw(drawable: ICanvasDrawable) {
      drawable.draw(this.canvas);
    }
  }
}
