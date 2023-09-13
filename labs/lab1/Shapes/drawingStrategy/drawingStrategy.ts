import { ICanvas } from "../canvas/canvas";
import {
  CircleDetails,
  LineDetails,
  RectangleDetails,
  ShapeDetails,
  TextDetails,
  TriangleDetails,
} from "../details/details";
import { Point } from "../point/point";

export type DrawingStrategyType = RectangleDrawingStrategy;

export interface IDrawingStrategy {
  details: ShapeDetails;
  draw(canvas: ICanvas): void;
  toString(): string;
}

export class RectangleDrawingStrategy implements IDrawingStrategy {
  details: RectangleDetails;

  constructor(details: RectangleDetails) {
    this.details = details;
  }

  toString() {
    const finalString =
      "rectangle - color:" +
      this.details.color +
      " - leftTop: " +
      this.details.leftTop.toString() +
      " - height: " +
      this.details.height +
      " - width: " +
      this.details.width;

    return finalString;
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

export class CircleDrawingStrategy implements IDrawingStrategy {
  details: CircleDetails;

  constructor(details: CircleDetails) {
    this.details = details;
  }

  toString() {
    const finalString =
      "circle - color:" +
      this.details.color +
      " - center: " +
      this.details.center.toString() +
      " - radius: " +
      this.details.radius;

    return finalString;
  }

  draw(canvas: ICanvas): void {
    const { color, center, radius } = this.details;

    canvas.moveTo(center);
    canvas.drawEllipse(center, radius, radius);
    canvas.setColor(color);
  }
}

export class TriangleDrawingStrategy implements IDrawingStrategy {
  details: TriangleDetails;

  constructor(details: TriangleDetails) {
    this.details = details;
  }

  toString() {
    const finalString =
      "triangle - color:" +
      this.details.color +
      " - firstVertex: " +
      this.details.firstVertex.toString() +
      " - secondVertex: " +
      this.details.secondVertex.toString() +
      " - thirdVertex: " +
      this.details.thirdVertex.toString();

    return finalString;
  }

  draw(canvas: ICanvas): void {
    const { color, firstVertex, secondVertex, thirdVertex } = this.details;

    canvas.moveTo(firstVertex);
    canvas.lineTo(secondVertex);
    canvas.lineTo(thirdVertex);
    canvas.lineTo(firstVertex);
    canvas.setColor(color);
  }
}

export class LineDrawingStrategy implements IDrawingStrategy {
  details: LineDetails;

  constructor(details: LineDetails) {
    this.details = details;
  }

  toString() {
    const finalString =
      "line - color:" +
      this.details.color +
      " - from: " +
      this.details.from.toString() +
      " - to: " +
      this.details.to.toString();

    return finalString;
  }

  draw(canvas: ICanvas): void {
    const { color, from, to } = this.details;

    canvas.moveTo(from);
    canvas.lineTo(to);
    canvas.setColor(color);
  }
}

export class TextDrawingStrategy implements IDrawingStrategy {
  details: TextDetails;

  constructor(details: TextDetails) {
    this.details = details;
  }

  toString() {
    const finalString =
      "text - color:" +
      this.details.color +
      " - from: " +
      this.details.leftTop.toString() +
      " - fontSize: " +
      this.details.fontSize +
      " - text: " +
      this.details.text;

    return finalString;
  }

  draw(canvas: ICanvas): void {
    const { color, fontSize, leftTop, text } = this.details;

    canvas.moveTo(leftTop);
    canvas.printText(leftTop, fontSize, text);
    canvas.setColor(color);
  }
}
