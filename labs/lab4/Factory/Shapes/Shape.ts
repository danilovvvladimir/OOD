import { ICanvas } from "../Canvas/ICanvas";
import { Color } from "../common/Color";

abstract class Shape {
  private color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  public getColor(): Color {
    return this.color;
  }

  public abstract draw(canvas: ICanvas): void;
}

export default Shape;
