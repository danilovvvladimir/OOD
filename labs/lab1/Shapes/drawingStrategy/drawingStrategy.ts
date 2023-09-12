import { ICanvas } from "../canvas/canvas";
import { RectangleDetails, ShapeDetails } from "../details/details";
import { Point } from "../point/point";

export type DrawingStrategyType = RectangleDrawingStrategy;

export interface IDrawingStrategy {
  details: ShapeDetails;
  draw(canvas: ICanvas): void;
}

export class RectangleDrawingStrategy implements IDrawingStrategy {
  details: RectangleDetails;

  constructor(details: RectangleDetails) {
    this.details = details;
  }

  draw(canvas: ICanvas): void {
    const { color, height, leftTop, width } = this.details;

    const rightBottom = new Point(
      leftTop.getX() + width,
      leftTop.getY() - height,
    );
    canvas.moveTo(leftTop);
    canvas.lineTo(new Point(rightBottom.getX(), leftTop.getY()));
    canvas.lineTo(new Point(rightBottom.getX(), rightBottom.getY()));
    canvas.lineTo(new Point(leftTop.getX(), rightBottom.getY()));
    canvas.lineTo(leftTop);
    canvas.setColor(color);
  }
}
