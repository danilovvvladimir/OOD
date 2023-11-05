import ICanvas from "../Canvas/ICanvas";
import Frame from "../Common/Frame";
import RGBAColor from "../Common/RGBAColor";
import FillStyle from "../Common/Styles/FillStyle";
import IFillStyle from "../Common/Styles/IFillStyle";
import ILineStyle from "../Common/Styles/ILineStyle";
import LineStyle from "../Common/Styles/LineStyle";
import IShapeGroup from "../ShapeGroup/IShapeGroup";
import IShape from "./IShape";

abstract class Shape implements IShape {
  protected frame: Frame;
  protected lineStyle: ILineStyle;
  protected fillStyle: IFillStyle;

  constructor(frame: Frame, lineStyle: ILineStyle, fillStyle: IFillStyle) {
    this.frame = frame;
    this.lineStyle = lineStyle;
    this.fillStyle = fillStyle;
  }

  public getFrame(): Frame {
    return this.frame;
  }

  public setFrame(frame: Frame): void {
    const coefWidth: number = frame.width / this.frame.width;
    const coefHeight: number = frame.height / this.frame.height;
    const deltaX: number = frame.x - this.frame.x;
    const deltaY: number = frame.y - this.frame.y;

    this.scale(coefWidth, coefHeight);
    this.move(deltaX, deltaY);
    this.frame = new Frame(frame.x, frame.y, frame.width, frame.height);
  }

  public getLineStyle(): ILineStyle {
    return this.lineStyle;
  }

  public setLineStyle(style: ILineStyle): void {
    const outlineColor = style.getColor();
    const lineWidth = style.getLineWidth();

    if (outlineColor) {
      this.lineStyle = new LineStyle(
        new RGBAColor(
          outlineColor.r,
          outlineColor.g,
          outlineColor.b,
          outlineColor.a,
        ),
        lineWidth,
      );
    }
  }

  public getFillStyle(): IFillStyle {
    return this.fillStyle;
  }

  public setFillStyle(style: IFillStyle): void {
    const fillColor = style.getColor();
    const hasFilling = style.hasFilling();

    if (fillColor) {
      this.fillStyle = new FillStyle(
        new RGBAColor(fillColor.r, fillColor.g, fillColor.b, fillColor.a),
        hasFilling,
      );
    }
  }

  public getGroup(): IShapeGroup {
    return undefined;
  }

  abstract draw(canvas: ICanvas): void;
  protected abstract scale(coefWidth: number, coefHeight: number): void;
  protected abstract move(deltaX: number, deltaY: number): void;
}

export default Shape;
