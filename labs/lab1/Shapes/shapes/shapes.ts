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
    private drawingStategy: IDrawingStrategy;

    constructor(drawingStrategy: IDrawingStrategy) {
      this.drawingStategy = drawingStrategy;
    }

    setColor(color: string) {
      this.drawingStategy.details.color = color;
    }

    getColor() {
      return this.drawingStategy.details.color;
    }

    setDrawingStrategy(newDrawingStategy: IDrawingStrategy) {
      this.drawingStategy = newDrawingStategy;
    }

    getDrawingStrategyInfo() {
      return this.drawingStategy.toString();
    }

    getControlPoints() {
      return this.drawingStategy.details.controlPoints;
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

    private findShapeById(id: string) {
      return this.shapes.find((sm) => sm.id === id);
    }

    addShape(id: string, drawingStategy: IDrawingStrategy): void {
      if (this.findShapeById(id)) {
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

    drawShape(id: string) {
      const shapeMap = this.findShapeById(id);

      if (!shapeMap) {
        throw new Error("Shape with this id doesn't exist");
      }

      shapeMap.shape.draw(this.canvas);
    }

    changeShape(id: string, newDrawingStategy: IDrawingStrategy) {
      const shapeMap = this.findShapeById(id);

      if (!shapeMap) {
        throw new Error("Shape with this id doesn't exist");
      }

      shapeMap.shape.setDrawingStrategy(newDrawingStategy);
    }

    changeColor(id: string, newColor: string) {
      const shapeMap = this.findShapeById(id);

      if (!shapeMap) {
        throw new Error("Shape with this id doesn't exist");
      }

      shapeMap.shape.setColor(newColor);
    }

    moveShape(id: string, dx: number, dy: number) {
      const shapeMap = this.findShapeById(id);

      if (!shapeMap) {
        throw new Error("Shape with this id doesn't exist");
      }

      shapeMap.shape.getControlPoints().forEach((cp) => {
        cp.setY(cp.getY() + dy);
        cp.setX(cp.getX() + dx);
      });
    }

    movePicture(dx: number, dy: number) {
      this.shapes.forEach((sm) => {
        sm.shape.getControlPoints().forEach((cp) => {
          cp.setY(cp.getY() + dy);
          cp.setX(cp.getX() + dx);
        });
      });
    }
  }
}

export = Shapes;
