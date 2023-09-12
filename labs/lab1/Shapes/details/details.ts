import { Point } from "../point/point";

export interface IShapeDetails {
  color: string;
}

export abstract class ShapeDetails implements IShapeDetails {
  color: string;

  constructor(color: string) {
    this.color = color;
  }
}

export class RectangleDetails extends ShapeDetails {
  leftTop: Point;
  width: number;
  height: number;

  constructor(leftTop: Point, width: number, height: number, color: string) {
    super(color);
    this.height = height;
    this.width = width;
    this.leftTop = leftTop;
  }
}

export class CircleDetails extends ShapeDetails {
  center: Point;
  radius: number;

  constructor(center: Point, radius: number, color: string) {
    super(color);
    this.center = center;
    this.radius = radius;
  }
}

export class TriangleDetails extends ShapeDetails {
  firstVertex: Point;
  secondVertex: Point;
  thirdVertex: Point;

  constructor(
    firstVertex: Point,
    secondVertex: Point,
    thirdVertex: Point,
    color: string,
  ) {
    super(color);

    this.firstVertex = firstVertex;
    this.secondVertex = secondVertex;
    this.thirdVertex = thirdVertex;
  }
}

export class LineDetails extends ShapeDetails {
  from: Point;
  to: Point;

  constructor(from: Point, to: Point, color: string) {
    super(color);

    this.from = from;
    this.to = to;
  }
}

export class TextDetails extends ShapeDetails {
  leftTop: Point;
  fontSize: number;
  text: string;

  constructor(leftTop: Point, fontSize: number, text: string, color: string) {
    super(color);

    this.leftTop = leftTop;
    this.fontSize = fontSize;
    this.text = text;
  }
}
