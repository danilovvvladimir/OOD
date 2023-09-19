import { ICanvas } from "../canvas/canvas";
import { IDrawingStrategy } from "../drawingStrategy/drawingStrategy";

export namespace Shapes {
  export class Shape {
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

  export class Picture {
    private shapes: Map<string, Shape>[] = [];
    private canvas: ICanvas;

    constructor(canvas: ICanvas) {
      this.canvas = canvas;
    }

    private findShapeById(id: string) {
      return this.shapes.find((map) => map.has(id));
    }

    addShape(id: string, drawingStategy: IDrawingStrategy): void {
      if (this.findShapeById(id)) {
        throw new Error("Shape with this id already exists");
      }

      const shapeMap = new Map<string, Shape>();
      shapeMap.set(id, new Shape(drawingStategy));
      this.shapes.push(shapeMap);
    }

    deleteShape(id: string) {
      const shapeMap = this.findShapeById(id);

      if (shapeMap) {
        shapeMap.delete(id);
        if (shapeMap.size === 0) {
          const index = this.shapes.indexOf(shapeMap);
          if (index !== -1) {
            this.shapes.splice(index, 1);
          }
        }
      }
    }

    list() {
      let stringList = "";
      let i = 1;

      for (const shapeMap of this.shapes) {
        for (const [id, shape] of shapeMap) {
          stringList +=
            i + " " + id + " " + shape.getDrawingStrategyInfo() + "\n";
          i++;
        }
      }

      return stringList;
    }

    drawPicture() {
      for (const shapeMap of this.shapes) {
        for (const shape of shapeMap.values()) {
          shape.draw(this.canvas);
        }
      }
    }

    drawShape(id: string) {
      const shapeMap = this.findShapeById(id);

      if (!shapeMap) {
        throw new Error("Shape with this id doesn't exist");
      }

      const shape = shapeMap.get(id);
      shape.draw(this.canvas);
    }

    changeShape(id: string, newDrawingStategy: IDrawingStrategy) {
      const shapeMap = this.findShapeById(id);

      if (!shapeMap) {
        throw new Error("Shape with this id doesn't exist");
      }

      const shape = shapeMap.get(id);
      shape.setDrawingStrategy(newDrawingStategy);
    }

    changeColor(id: string, newColor: string) {
      const shapeMap = this.findShapeById(id);

      if (!shapeMap) {
        throw new Error("Shape with this id doesn't exist");
      }

      const shape = shapeMap.get(id);
      shape.setColor(newColor);
    }

    moveShape(id: string, dx: number, dy: number) {
      const shapeMap = this.findShapeById(id);

      if (!shapeMap) {
        throw new Error("Shape with this id doesn't exist");
      }

      const shape = shapeMap.get(id);
      if (shape) {
        for (const cp of shape.getControlPoints()) {
          cp.setY(cp.getY() + dy);
          cp.setX(cp.getX() + dx);
        }
      }
    }

    // не n^3, а n * 1 * n.
    movePicture(dx: number, dy: number) {
      for (const shapeMap of this.shapes) {
        for (const shape of shapeMap.values()) {
          for (const cp of shape.getControlPoints()) {
            cp.setY(cp.getY() + dy);
            cp.setX(cp.getX() + dx);
          }
        }
      }
    }
  }
}
