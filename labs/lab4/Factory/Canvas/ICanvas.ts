import Point from "../Point/Point";
import { Color } from "../common/Color";

export interface ICanvas {
  setColor(color: Color): void;
  drawLine(from: Point, to: Point): void;
  drawEllipse(center: Point, widthRadius: number, heightRadius: number): void;
}
