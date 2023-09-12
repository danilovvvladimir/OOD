import { Point } from "../point/point";

export interface ICanvas {
  setColor(color: string): void;
  moveTo(point: Point): void;
  lineTo(point: Point): void;
  drawEllipse(
    centerPoint: Point,
    radiusWidth: number,
    radiusHeight: number,
  ): void;
  printText(leftTop: Point, size: number, text: string): void;
}

export class Canvas implements ICanvas {
  setColor(color: string): void {
    console.log(`Setted color ${color}`);
  }

  moveTo(point: Point): void {
    console.log(`Move view to ${point.toString()}`);
  }

  lineTo(point: Point): void {
    console.log(`Created line to ${point.toString()}`);
  }

  printText(left: Point, top: Point, size: number, text: string): void {
    console.log(
      `Text printed at ${
        (left.toString(), top.toString())
      }, size: ${size}, text: ${text}`,
    );
  }

  drawEllipse(
    centerPoint: Point,
    radiusWidth: number,
    radiusHeight: number,
  ): void {
    console.log(
      `Draw ellipse ${centerPoint.toString()}, radiusWidth: ${radiusWidth}, radiusHeight: ${radiusHeight}`,
    );
  }
}
