import { IShapeEnumerable } from "../../Shapes/IShapeEnumerable";
import ShapeEnumerator from "../../Shapes/ShapeEnumerable";
import RGBAColor from "../RGBAColor";
import IFillStyle from "./IFillStyle";

class CompoundFillStyle implements IFillStyle {
  private shapeEnumerator: ShapeEnumerator;

  constructor(shapeEnumerator: ShapeEnumerator) {
    this.shapeEnumerator = shapeEnumerator;
  }

  public getColor(): RGBAColor {
    this.shapeEnumerator.reset();
    let lineStyle: IFillStyle;

    while (this.shapeEnumerator.hasNext()) {
      const shape: IShapeEnumerable = this.shapeEnumerator.next();
      const shapeLineStyle: IFillStyle = shape.getFillStyle();

      if (!lineStyle) {
        lineStyle = shapeLineStyle;
      } else {
        if (
          lineStyle?.getColor()?.toString() !==
            shapeLineStyle?.getColor()?.toString() ||
          lineStyle?.hasFilling() !== shapeLineStyle?.hasFilling()
        ) {
          return undefined;
        }
      }
    }

    return lineStyle?.getColor();
  }

  public hasFilling(): boolean {
    this.shapeEnumerator.reset();
    let lineStyle: IFillStyle;

    while (this.shapeEnumerator.hasNext()) {
      const shape: IShapeEnumerable = this.shapeEnumerator.next();
      const shapeLineStyle: IFillStyle = shape.getFillStyle();

      if (!lineStyle) {
        lineStyle = shapeLineStyle;
      } else {
        if (
          lineStyle?.getColor()?.toString() !==
            shapeLineStyle?.getColor()?.toString() ||
          lineStyle?.hasFilling() !== shapeLineStyle?.hasFilling()
        ) {
          return undefined;
        }
      }
    }

    return lineStyle?.hasFilling();
  }
}

export default CompoundFillStyle;
