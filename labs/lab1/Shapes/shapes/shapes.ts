import { ICanvas } from "../canvas/canvas";

import { IDrawingStrategy } from "../drawingStrategy/drawingStrategy";

namespace Shapes {
  export class Shape {
    private color: string;
    private drawingStategy: IDrawingStrategy;

    // constructor(drawingStrategy: IDrawingStrategy, color: string) {
    constructor(drawingStrategy: IDrawingStrategy) {
      this.drawingStategy = drawingStrategy;
      // this.color = color;
    }

    setColor(color: string) {
      this.color = color;
    }

    getColor() {
      return this.color;
    }

    setDrawingStrategy(newDrawingStategy: IDrawingStrategy) {
      this.drawingStategy = newDrawingStategy;
    }

    draw(canvas: ICanvas) {
      this.drawingStategy.draw(canvas);
    }
  }

  export interface shapeMap {
    id: string;
    shape: Shape;
  }

  export class Picture {
    private shapes: shapeMap[] = [];
    private canvas: ICanvas;

    constructor(canvas: ICanvas) {
      this.canvas = canvas;
    }

    addShape(id: string, drawingStategy: IDrawingStrategy): void {
      this.shapes.push({
        id,
        shape: new Shape(drawingStategy),
      });
    }

    drawPicture() {
      this.shapes.forEach((item) => item.shape.draw(this.canvas));
    }
  }
}

export = Shapes;
