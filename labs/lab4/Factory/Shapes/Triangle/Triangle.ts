import { ICanvas } from "../../Canvas/ICanvas";
import Point from "../../Point/Point";
import { Color } from "../../common/Color";
import Shape from "../Shape";

class Triangle extends Shape {
  private firstVertex: Point;
  private secondVertex: Point;
  private thirdVertex: Point;

  constructor(
    firstVertex: Point,
    secondVertex: Point,
    thirdVertex: Point,
    color: Color,
  ) {
    super(color);
    this.firstVertex = firstVertex;
    this.secondVertex = secondVertex;
    this.thirdVertex = thirdVertex;
  }

  public draw(canvas: ICanvas): void {
    canvas.setColor(super.getColor());
    canvas.drawLine(this.firstVertex, this.secondVertex);
    canvas.drawLine(this.secondVertex, this.thirdVertex);
    canvas.drawLine(this.thirdVertex, this.firstVertex);
  }

  public getFirstVertex(): Point {
    return this.firstVertex;
  }

  public getSecondVertex(): Point {
    return this.secondVertex;
  }

  public getThirdVertex(): Point {
    return this.thirdVertex;
  }
}

export default Triangle;
