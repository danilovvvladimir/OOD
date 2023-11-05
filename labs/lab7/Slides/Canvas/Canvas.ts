import { Canvas, CanvasRenderingContext2D, createCanvas } from "canvas";
import { promises as fs } from "fs";
import ICanvas from "./ICanvas";
import Point from "../Common/Point";

export class CCanvas implements ICanvas {
  private canvas: Canvas;
  private context: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.canvas = createCanvas(width, height);
    this.context = this.canvas.getContext("2d");

    this.context.lineWidth = 2;
    this.context.strokeStyle = "black";
    this.context.fillStyle = "black";
  }

  public drawLine(from: Point, to: Point): void {
    this.context.beginPath();
    this.context.moveTo(from.x, from.y);
    this.context.lineTo(to.x, to.y);
    this.context.stroke();
    this.context.closePath();
  }

  public drawEllipse(center: Point, radiusX: number, radiusY: number): void {
    this.context.beginPath();
    this.context.ellipse(center.x, center.y, radiusX, radiusY, 0, 0, 360);
    this.context.stroke();
    this.context.closePath();
  }

  public fillEllipse(center: Point, radiusX: number, radiusY: number): void {
    this.context.beginPath();
    this.context.ellipse(center.x, center.y, radiusX, radiusY, 0, 0, 360);
    this.context.closePath();
    this.context.fill();
  }

  public fillPolygon(points: Point[]): void {
    if (points.length < 3) {
      throw new Error("Points's count cannot be less 3");
    }

    this.context.beginPath();
    this.context.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      this.context.lineTo(points[i].x, points[i].y);
    }

    this.context.closePath();
    this.context.fill();
  }

  public setFillColor(color: string): void {
    this.context.fillStyle = color;
  }

  public setLineColor(color: string): void {
    this.context.strokeStyle = color;
  }

  public setLineWidth(width: number): void {
    this.context.lineWidth = width;
  }

  public async saveToPng(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const buffer = this.canvas.toBuffer("image/png");
        fs.writeFile(path, buffer).then(() => {
          resolve("OK");
        });
      } catch (e) {
        reject(String(e));
      }
    });
  }
}
