import { GraphicsLib } from "../GraphicsLib/Graphlib";

export namespace ShapeDrawingLib {
  export class Point {
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
    // readonly
    public x: number;
    public y: number;
  }

  export interface ICanvasDrawable {
    draw(canvas: GraphicsLib.ICanvas): void;
  }

  export class CTriangle implements ICanvasDrawable {
    private firstVertex: Point;
    private secondVertex: Point;
    private thirdVertex: Point;

    constructor(p1: Point, p2: Point, p3: Point) {
      this.firstVertex = p1;
      this.secondVertex = p2;
      this.thirdVertex = p3;
    }

    public draw(canvas: GraphicsLib.ICanvas): void {
      canvas.moveTo(this.firstVertex.x, this.firstVertex.y);
      canvas.lineTo(this.secondVertex.x, this.secondVertex.y);
      canvas.lineTo(this.thirdVertex.x, this.thirdVertex.y);
      canvas.lineTo(this.firstVertex.x, this.firstVertex.y);
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
