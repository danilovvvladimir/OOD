import RGBAColor from "../RGBAColor";
import ILineStyle from "./ILineStyle";

class LineStyle implements ILineStyle {
  private color: RGBAColor;
  private lineWidth: number;

  constructor(
    color: RGBAColor = new RGBAColor(0, 0, 0, 1),
    lineWidth: number = 0,
  ) {
    this.color = color;
    this.lineWidth = lineWidth;
  }

  public getColor(): RGBAColor {
    return this.color;
  }

  public hasOutline(): boolean {
    return this.lineWidth !== 0;
  }

  public getLineWidth(): number {
    return this.lineWidth;
  }
}

export default LineStyle;
