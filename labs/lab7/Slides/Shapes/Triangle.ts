import ICanvas from "../Canvas/ICanvas";
import Frame from "../Common/Frame";
import Point from "../Common/Point";
import RGBAColor from "../Common/RGBAColor";
import IFillStyle from "../Common/Styles/IFillStyle";
import ILineStyle from "../Common/Styles/ILineStyle";
import Shape from "./Shape";

class Triangle extends Shape {
  private points: Point[];

  constructor(
    frame: Frame,
    lineStyle: ILineStyle,
    fillStyle: IFillStyle,
    points: Point[],
  ) {
    if (points.length !== 3) {
      throw new Error("Incorrect points count. Points count should be 3");
    }
    super(frame, lineStyle, fillStyle);

    this.points = points;
  }

  public draw(canvas: ICanvas): void {
    const lineColor: RGBAColor = this.lineStyle.getColor();
    const fillColor: RGBAColor = this.fillStyle.getColor();
    const lineWidth: number = this.lineStyle.getLineWidth();

    if (lineColor) {
      canvas.setLineColor(lineColor.toString());
    }
    if (fillColor) {
      canvas.setFillColor(fillColor.toString());
    }
    if (lineWidth) {
      canvas.setLineWidth(lineWidth);
    }

    canvas.drawLine(this.points[0], this.points[1]);
    canvas.drawLine(this.points[1], this.points[2]);
    canvas.drawLine(this.points[2], this.points[0]);
    if (this.fillStyle.hasFilling()) {
      canvas.fillPolygon(this.points);
    }
  }

  protected scale(coefWidth: number, coefHeight: number): void {
    const xAverage =
      (this.points[0].x + this.points[1].x + this.points[2].x) / 3;
    const yAverage =
      (this.points[0].y + this.points[1].y + this.points[2].y) / 3;

    this.points[0] = new Point(
      coefWidth * (this.points[0].x - xAverage) + xAverage,
      coefHeight * (this.points[0].y - yAverage) + yAverage,
    );
    this.points[1] = new Point(
      coefWidth * (this.points[1].x - xAverage) + xAverage,
      coefHeight * (this.points[1].y - yAverage) + yAverage,
    );
    this.points[2] = new Point(
      coefWidth * (this.points[2].x - xAverage) + xAverage,
      coefHeight * (this.points[2].y - yAverage) + yAverage,
    );
  }

  protected move(deltaX: number, deltaY: number): void {
    this.points[0] = new Point(
      this.points[0].x + deltaX,
      this.points[0].y + deltaY,
    );
    this.points[1] = new Point(
      this.points[1].x + deltaX,
      this.points[1].y + deltaY,
    );
    this.points[2] = new Point(
      this.points[2].x + deltaX,
      this.points[2].y + deltaY,
    );
  }
}

export default Triangle;
