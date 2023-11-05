import ICanvas from "../Canvas/ICanvas";
import Frame from "../Common/Frame";
import CompoundFillStyle from "../Common/Styles/CompoundFillStyle";
import CompoundLineStyle from "../Common/Styles/CompoundLineStyle";
import FillStyle from "../Common/Styles/FillStyle";
import IFillStyle from "../Common/Styles/IFillStyle";
import ILineStyle from "../Common/Styles/ILineStyle";
import LineStyle from "../Common/Styles/LineStyle";
import IShape from "../Shapes/IShape";
import ShapeEnumerator from "../Shapes/ShapeEnumerable";
import IShapeGroup from "./IShapeGroup";

class ShapeGroup implements IShapeGroup {
  private frame: Frame;
  private lineStyle: ILineStyle;
  private fillStyle: IFillStyle;
  private shapes: IShape[];

  constructor(frame: Frame) {
    this.frame = frame;
    this.shapes = [];
    this.lineStyle = new CompoundLineStyle(new ShapeEnumerator(this.shapes));
    this.fillStyle = new CompoundFillStyle(new ShapeEnumerator(this.shapes));
  }

  public getFrame(): Frame {
    return this.frame;
  }

  public setFrame(frame: Frame): void {
    const coefWidth: number = frame.width / this.frame.width;
    const coefHeight: number = frame.height / this.frame.height;
    const deltaX: number = frame.x - this.frame.x;
    const deltaY: number = frame.y - this.frame.y;

    this.shapes.forEach((shape: IShape) => {
      const shapeFrame: Frame = shape.getFrame();

      shape.setFrame(
        new Frame(
          shapeFrame.x + deltaX,
          shapeFrame.y + deltaY,
          shapeFrame.width * coefWidth,
          shapeFrame.height * coefHeight,
        ),
      );
    });
    this.frame = frame;
  }

  public getLineStyle(): ILineStyle {
    return this.lineStyle;
  }

  public setLineStyle(style: ILineStyle): void {
    this.shapes.forEach((shape: IShape) => {
      shape.setLineStyle(new LineStyle(style.getColor(), style.getLineWidth()));
    });
  }

  public getFillStyle(): IFillStyle {
    return this.fillStyle;
  }

  public setFillStyle(style: IFillStyle): void {
    this.shapes.forEach((shape: IShape) => {
      shape.setFillStyle(new FillStyle(style.getColor(), style.hasFilling()));
    });
  }

  public draw(canvas: ICanvas): void {
    this.shapes.forEach((shape: IShape) => {
      shape.draw(canvas);
    });
  }

  public getGroup(): IShapeGroup {
    return this;
  }

  public getShapesCount(): number {
    return this.shapes.length;
  }

  public getShapeAtIndex(index: number): IShape {
    if (index > this.shapes.length - 1) {
      throw new Error("Incorrect index");
    }

    return this.shapes[index];
  }

  public insertShape(shape: IShape, index: number): void {
    if (shape !== this) {
      this.shapes.splice(index, 0, shape);
    }
  }

  public removeShapeAtIndex(index: number): void {
    this.shapes.splice(index, 1);
  }
}

export default ShapeGroup;
