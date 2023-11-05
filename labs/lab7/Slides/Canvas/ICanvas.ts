import Point from "../Common/Point";

interface ICanvas {
  drawLine(from: Point, to: Point): void;
  drawEllipse(center: Point, radiusX: number, radiusY: number): void;

  fillEllipse(center: Point, radiusX: number, radiusY: number): void;
  fillPolygon(points: Point[]): void;

  setFillColor(color: string): void;
  setLineColor(color: string): void;
  setLineWidth(width: number): void;

  saveToPng(path: string): Promise<string>;
}

export default ICanvas;
