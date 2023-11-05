import ICanvas from "../Canvas/ICanvas";
import Frame from "../Common/Frame";
import Point from "../Common/Point";
import RGBAColor from "../Common/RGBAColor";
import IFillStyle from "../Common/Styles/IFillStyle";
import ILineStyle from "../Common/Styles/ILineStyle";
import Shape from "./Shape";

class Rectangle extends Shape {
  private leftTopPoint: Point;
  private width: number;
  private height: number;

  constructor(
    frame: Frame,
    lineStyle: ILineStyle,
    fillStyle: IFillStyle,
    leftTopPoint: Point,
    width: number,
    height: number,
  ) {
    if (width < 0) {
      throw new Error("Width can not be negative");
    }

    if (height < 0) {
      throw new Error("Height can not be negative");
    }

    super(frame, lineStyle, fillStyle);

    this.leftTopPoint = leftTopPoint;
    this.width = width;
    this.height = height;
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

    const rightTopPoint: Point = new Point(
      this.leftTopPoint.x + this.width,
      this.leftTopPoint.y,
    );
    const rightBottomPoint: Point = new Point(
      this.leftTopPoint.x + this.width,
      this.leftTopPoint.y + this.height,
    );
    const leftBottomPoint: Point = new Point(
      this.leftTopPoint.x,
      this.leftTopPoint.y + this.height,
    );

    canvas.drawLine(this.leftTopPoint, rightTopPoint);
    canvas.drawLine(rightTopPoint, rightBottomPoint);
    canvas.drawLine(rightBottomPoint, leftBottomPoint);
    canvas.drawLine(leftBottomPoint, this.leftTopPoint);
    if (this.fillStyle.hasFilling()) {
      canvas.fillPolygon([
        this.leftTopPoint,
        rightTopPoint,
        rightBottomPoint,
        leftBottomPoint,
      ]);
    }
  }

  protected scale(coefWidth: number, coefHeight: number): void {
    this.width = coefWidth * this.width;
    this.height = coefHeight * this.height;
  }

  protected move(deltaX: number, deltaY: number): void {
    this.leftTopPoint = new Point(
      this.leftTopPoint.x + deltaX,
      this.leftTopPoint.y + deltaY,
    );
  }
}

export default Rectangle;
