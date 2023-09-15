import { ICanvas } from "../canvas/canvas";
import { IDrawingStrategy } from "../drawingStrategy/drawingStrategy";

export namespace Shapes {
  class Shape {
    constructor(private drawingStrategy: IDrawingStrategy) {}

    setColor(color: string) {
      this.drawingStrategy.details.color = color;
    }

    getColor() {
      return this.drawingStrategy.details.color;
    }

    setDrawingStrategy(newDrawingStategy: IDrawingStrategy) {
      this.drawingStrategy = newDrawingStategy;
    }

    getDrawingStrategyInfo() {
      return this.drawingStrategy.toString();
    }

    getControlPoints() {
      return this.drawingStrategy.details.controlPoints;
    }

    draw(canvas: ICanvas) {
      this.drawingStrategy.draw(canvas);
    }
  }

  interface IShapeMap {
    id: string;
    shape: Shape;
  }

  export class Picture {
    private shapes: IShapeMap[] = [];
    private canvas: ICanvas;

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
      let stringList = "";
      for (let i = 0; i < this.shapes.length; i++) {
        stringList =
          stringList +
          (i + 1) +
          " " +
          this.shapes[i].id +
          " " +
          this.shapes[i].shape.getDrawingStrategyInfo() +
          "\n";
      }

      return stringList;
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
