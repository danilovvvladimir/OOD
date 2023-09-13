import { Point } from "../point/point";

export interface IShapeDetails {
  color: string;
}

export abstract class ShapeDetails implements IShapeDetails {
  color: string;
  controlPoints: Point[];

  constructor(color: string, controlPoints: Point[]) {
    this.color = color;
    this.controlPoints = controlPoints;
  }
}

export class RectangleDetails extends ShapeDetails {
  constructor(leftTop: Point, rightBottom: Point, color: string) {
    super(color, [leftTop, rightBottom]);
  }
}

export class CircleDetails extends ShapeDetails {
  radius: number;

  constructor(center: Point, radius: number, color: string) {
    super(color, [center]);
    this.radius = radius;
  }
}

export class TriangleDetails extends ShapeDetails {
  constructor(
    firstVertex: Point,
    secondVertex: Point,
    thirdVertex: Point,
    color: string,
  ) {
    super(color, [firstVertex, secondVertex, thirdVertex]);
  }
}

export class LineDetails extends ShapeDetails {
  constructor(from: Point, to: Point, color: string) {
    super(color, [from, to]);
  }
}

export class TextDetails extends ShapeDetails {
  fontSize: number;
  text: string;

  constructor(leftTop: Point, fontSize: number, text: string, color: string) {
    super(color, [leftTop]);

    this.fontSize = fontSize;
    this.text = text;
  }
}
