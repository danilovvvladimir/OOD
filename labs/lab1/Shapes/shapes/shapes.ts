import { ICanvas } from "../canvas/canvas";

import { IDrawingStrategy } from "../drawingStrategy/drawingStrategy";

namespace Shapes {
  export class PictureLogger {
    printList(shapeMaps: IShapeMap[]) {
      for (let i = 0; i < shapeMaps.length; i++) {
        console.log(
          i + 1,
          shapeMaps[i].id,
          shapeMaps[i].shape.getDrawingStrategyInfo(),
        );
      }
    }
  }

  export class Shape {
    private color: string;
    private drawingStategy: IDrawingStrategy;

    constructor(drawingStrategy: IDrawingStrategy) {
      this.drawingStategy = drawingStrategy;
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

    getDrawingStrategyInfo() {
      return this.drawingStategy.toString();
    }

    draw(canvas: ICanvas) {
      this.drawingStategy.draw(canvas);
    }
  }

  export interface IShapeMap {
    id: string;
    shape: Shape;
  }

  export class Picture {
    private shapes: IShapeMap[] = [];
    private canvas: ICanvas;
    private logger: PictureLogger = new PictureLogger();

    constructor(canvas: ICanvas) {
      this.canvas = canvas;
    }

    addShape(id: string, drawingStategy: IDrawingStrategy): void {
      if (this.shapes.find((s) => s.id === id)) {
        throw new Error("Shape with this id is already exist");
      }

      this.shapes.push({
        id,
        shape: new Shape(drawingStategy),
      });
    }

    deleteShape(id: string) {
      this.shapes = this.shapes.filter((sm) => sm.id !== id);
    }

    list() {
      this.logger.printList(this.shapes);
    }

    drawPicture() {
      this.shapes.forEach((item) => item.shape.draw(this.canvas));
    }
  }
}

export = Shapes;
