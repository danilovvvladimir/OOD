import Point from "../Point/Point";
import { Color } from "../common/Color";
import { ICanvas } from "./ICanvas";

class Canvas implements ICanvas {
  private color: Color;

  private readonly DEFAULT_STROKE_WIDTH = 2;

  private width: number = 0;
  private height: number = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.color = Color.RED;
  }

  public setColor(color: Color): void {
    this.color = color;
  }

  public drawLine(from: Point, to: Point): void {
    console.log(`Drawed line from ${from.toString()} to ${to.toString()}`);
  }

  public drawEllipse(
    center: Point,
    widthRadius: number,
    heightRadius: number,
  ): void {
    console.log(
      `Drawed ellipse with center in ${center.toString()}, width radius -  ${widthRadius}, height radius - ${heightRadius}`,
    );
  }
}

export default Canvas;
