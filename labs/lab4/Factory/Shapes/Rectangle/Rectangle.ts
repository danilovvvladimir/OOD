import { ICanvas } from "../../Canvas/ICanvas";
import Point from "../../Point/Point";
import { Color } from "../../common/Color";
import Shape from "../Shape";

class Rectangle extends Shape {
  private leftTop: Point;
  private rightBottom: Point;

  constructor(leftTop: Point, rightBottom: Point, color: Color) {
    super(color);
    this.leftTop = leftTop;
    this.rightBottom = rightBottom;
  }

  public draw(canvas: ICanvas): void {
    const rightTop = new Point(this.rightBottom.getX(), this.leftTop.getY());
    const leftBottom = new Point(this.leftTop.getX(), this.rightBottom.getY());

    canvas.setColor(super.getColor());

    canvas.drawLine(this.leftTop, rightTop);
    canvas.drawLine(rightTop, this.rightBottom);
    canvas.drawLine(this.rightBottom, leftBottom);
    canvas.drawLine(leftBottom, this.leftTop);
  }

  public getLeftTop(): Point {
    return this.leftTop;
  }

  public getRightBottom(): Point {
    return this.rightBottom;
  }
}

export default Rectangle;
