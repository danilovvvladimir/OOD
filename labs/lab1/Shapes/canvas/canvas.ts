import { createWriteStream } from "fs";
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
  printText(leftTop: Point, size: number, text: string, color: string): void;
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

  printText(leftTop: Point, size: number, text: string): void {
    console.log(
      `Text printed at ${leftTop.toString()}, size: ${size}, text: ${text}`,
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

export class SvgCanvas implements ICanvas {
  private svgContent: string = "";

  constructor(private filePath: string) {}

  setColor(color: string): void {
    this.svgContent += `" stroke="${color}" stroke-width="1" fill="${color}"></path>`;
    this.saveToFile();
  }

  moveTo(point: Point): void {
    this.svgContent += `<path d="M ${point.getX()} ${point.getY()} `;
    this.saveToFile();
  }

  lineTo(point: Point): void {
    this.svgContent += `L ${point.getX()} ${point.getY()}`;
    this.saveToFile();
  }

  drawEllipse(
    centerPoint: Point,
    radiusWidth: number,
    radiusHeight: number,
  ): void {
    this.svgContent += `A ${radiusWidth} ${radiusHeight} 0 0 0 ${
      centerPoint.getX() + radiusWidth
    } ${centerPoint.getY()} `;
    this.svgContent += `A ${radiusWidth} ${radiusHeight} 0 0 0 ${
      centerPoint.getX() - radiusWidth
    } ${centerPoint.getY()} `;
    this.saveToFile();
  }

  printText(leftTop: Point, size: number, text: string, color: string): void {
    this.svgContent += `<text x="${leftTop.getX()}" y="${leftTop.getY()}" font-size="${size}" fill="${color}">${text}</text>`;
    this.saveToFile();
  }

  private saveToFile(): void {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">${this.svgContent}</svg>`;
    const writeStream = createWriteStream(this.filePath);
    writeStream.write(svgContent);
    writeStream.close();
  }
}
