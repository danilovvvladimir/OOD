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
      this.details.controlPoints[0].toString() +
      " - rightBottom: " +
      this.details.controlPoints[1].toString();

    return finalString;
  }

  draw(canvas: ICanvas): void {
    const { color, controlPoints } = this.details;

    canvas.moveTo(controlPoints[0]);
    canvas.lineTo(new Point(controlPoints[1].getX(), controlPoints[0].getY()));
    canvas.lineTo(new Point(controlPoints[1].getX(), controlPoints[1].getY()));
    canvas.lineTo(new Point(controlPoints[0].getX(), controlPoints[1].getY()));
    canvas.lineTo(controlPoints[0]);
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
      this.details.controlPoints[0].toString() +
      " - radius: " +
      this.details.radius;

    return finalString;
  }

  draw(canvas: ICanvas): void {
    const { color, controlPoints, radius } = this.details;

    canvas.drawEllipse(controlPoints[0], radius, radius);
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
      this.details.controlPoints[0].toString() +
      " - secondVertex: " +
      this.details.controlPoints[1].toString() +
      " - thirdVertex: " +
      this.details.controlPoints[2].toString();

    return finalString;
  }

  draw(canvas: ICanvas): void {
    const { color, controlPoints } = this.details;

    canvas.moveTo(controlPoints[0]);
    canvas.lineTo(controlPoints[1]);
    canvas.lineTo(controlPoints[2]);
    canvas.lineTo(controlPoints[0]);
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
      this.details.controlPoints[0].toString() +
      " - to: " +
      this.details.controlPoints[1].toString();

    return finalString;
  }

  draw(canvas: ICanvas): void {
    const { color, controlPoints } = this.details;

    canvas.moveTo(controlPoints[0]);
    canvas.lineTo(controlPoints[1]);
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
      " - leftTop: " +
      this.details.controlPoints[0].toString() +
      " - fontSize: " +
      this.details.fontSize +
      " - text: " +
      this.details.text;

    return finalString;
  }

  draw(canvas: ICanvas): void {
    const { color, fontSize, controlPoints, text } = this.details;

    canvas.moveTo(controlPoints[0]);
    canvas.printText(controlPoints[0], fontSize, text);
    canvas.setColor(color);
  }
}
