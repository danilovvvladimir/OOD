import ICanvas from "../Canvas/ICanvas";
import Frame from "../Common/Frame";
import Point from "../Common/Point";
import RGBAColor from "../Common/RGBAColor";
import IFillStyle from "../Common/Styles/IFillStyle";
import ILineStyle from "../Common/Styles/ILineStyle";
import Shape from "./Shape";

class Ellipse extends Shape {
  private centerPoint: Point;
  private radiusX: number;
  private radiusY: number;

  constructor(
    frame: Frame,
    lineStyle: ILineStyle,
    fillStyle: IFillStyle,
    centerPoint: Point,
    radiusX: number,
    radiusY: number,
  ) {
    super(frame, lineStyle, fillStyle);

    this.centerPoint = centerPoint;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
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

    canvas.drawEllipse(this.centerPoint, this.radiusX, this.radiusY);
    if (this.fillStyle.hasFilling()) {
      canvas.fillEllipse(this.centerPoint, this.radiusX, this.radiusY);
    }
  }

  protected scale(coefWidth: number, coefHeight: number): void {
    this.radiusX = coefWidth * this.radiusX;
    this.radiusY = coefHeight * this.radiusY;
  }

  protected move(deltaX: number, deltaY: number): void {
    this.centerPoint = new Point(
      this.centerPoint.x + deltaX,
      this.centerPoint.y + deltaY,
    );
  }
}

export default Ellipse;
