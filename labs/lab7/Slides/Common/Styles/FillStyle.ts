import RGBAColor from "../RGBAColor";
import IFillStyle from "./IFillStyle";

class FillStyle implements IFillStyle {
  private color: RGBAColor;
  private filling: boolean;

  constructor(
    color: RGBAColor = new RGBAColor(0, 0, 0, 1),
    hasFilling: boolean = false,
  ) {
    this.color = color;
    this.filling = hasFilling;
  }

  public getColor(): RGBAColor {
    return this.color;
  }

  public hasFilling(): boolean {
    return this.filling;
  }
}

export default FillStyle;
