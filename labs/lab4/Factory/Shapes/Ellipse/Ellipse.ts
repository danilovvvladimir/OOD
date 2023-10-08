import { ICanvas } from "../../Canvas/ICanvas";
import Point from "../../Point/Point";
import { Color } from "../../common/Color";
import Shape from "../Shape";

class Ellipse extends Shape {
  private center: Point;
  private widthRadius: number;
  private heightRadius: number;

  constructor(
    center: Point,
    widthRadius: number,
    heightRadius: number,
    color: Color,
  ) {
    super(color);
    this.center = center;
    this.widthRadius = widthRadius;
    this.heightRadius = heightRadius;
  }

  public draw(canvas: ICanvas): void {
    canvas.setColor(super.getColor());
    canvas.drawEllipse(this.center, this.widthRadius, this.heightRadius);
  }

  public getCenter(): Point {
    return this.center;
  }

  public getWidthRadius(): number {
    return this.widthRadius;
  }

  public getHeightRadius(): number {
    return this.heightRadius;
  }
}

export default Ellipse;
