import { IShapeEnumerable } from "../../Shapes/IShapeEnumerable";
import ShapeEnumerator from "../../Shapes/ShapeEnumerator";
import RGBAColor from "../RGBAColor";
import ILineStyle from "./ILineStyle";

class CompoundLineStyle implements ILineStyle {
  private shapeEnumerator: ShapeEnumerator;

  constructor(shapeEnumerator: ShapeEnumerator) {
    this.shapeEnumerator = shapeEnumerator;
  }

  public getColor(): RGBAColor {
    this.shapeEnumerator.reset();
    let lineStyle: ILineStyle;

    while (this.shapeEnumerator.hasNext()) {
      const shape: IShapeEnumerable = this.shapeEnumerator.next();
      const shapeLineStyle: ILineStyle = shape.getLineStyle();

      if (!lineStyle) {
        lineStyle = shapeLineStyle;
      } else {
        if (
          lineStyle?.getColor()?.toString() !==
            shapeLineStyle?.getColor()?.toString() ||
          lineStyle?.getLineWidth() !== shapeLineStyle?.getLineWidth()
        ) {
          return undefined;
        }
      }
    }

    return lineStyle?.getColor();
  }

  public hasOutline(): boolean {
    this.shapeEnumerator.reset();
    let lineStyle: ILineStyle;

    while (this.shapeEnumerator.hasNext()) {
      const shape: IShapeEnumerable = this.shapeEnumerator.next();
      const shapeLineStyle: ILineStyle = shape.getLineStyle();

      if (!lineStyle) {
        lineStyle = shapeLineStyle;
      } else {
        if (
          lineStyle?.getColor()?.toString() !==
            shapeLineStyle?.getColor()?.toString() ||
          lineStyle?.getLineWidth() !== shapeLineStyle?.getLineWidth()
        ) {
          return undefined;
        }
      }
    }

    return lineStyle?.hasOutline();
  }

  public getLineWidth(): number | undefined {
    this.shapeEnumerator.reset();
    let lineStyle: ILineStyle | undefined;

    while (this.shapeEnumerator.hasNext()) {
      const shape: IShapeEnumerable = this.shapeEnumerator.next();
      const shapeLineStyle: ILineStyle = shape.getLineStyle();

      if (!lineStyle) {
        lineStyle = shapeLineStyle;
      } else {
        if (
          lineStyle?.getColor()?.toString() !==
            shapeLineStyle?.getColor()?.toString() ||
          lineStyle?.getLineWidth() !== shapeLineStyle?.getLineWidth()
        ) {
          return undefined;
        }
      }
    }

    return lineStyle?.getLineWidth();
  }
}

export default CompoundLineStyle;
