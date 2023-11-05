import IStyle from "./IStyle";

interface ILineStyle extends IStyle {
  hasOutline(): boolean;
  getLineWidth(): number;
}

export default ILineStyle;
