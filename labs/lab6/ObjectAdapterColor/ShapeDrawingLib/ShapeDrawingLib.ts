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
    private firstVertex: Point;
    private secondVertex: Point;
    private thirdVertex: Point;
    private rgbColor: number;

    constructor(p1: Point, p2: Point, p3: Point, rgbColor: number = 0) {
      this.firstVertex = p1;
      this.secondVertex = p2;
      this.thirdVertex = p3;
      this.rgbColor = rgbColor;
    }

    public draw(canvas: GraphicsLib.ICanvas): void {
      canvas.setColor(this.rgbColor);
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
    private rgbColor: number;

    constructor(
      leftTopPoint: Point,
      width: number,
      height: number,
      rgbColor: number = 0,
    ) {
      if (width < 0) {
        throw new Error("Width can not be negative number");
      }
      if (height < 0) {
        throw new Error("Height can not be negative number");
      }

      this.leftTopPoint = leftTopPoint;
      this.width = width;
      this.height = height;
      this.rgbColor = rgbColor;
    }

    public draw(canvas: GraphicsLib.ICanvas): void {
      canvas.setColor(this.rgbColor);
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
