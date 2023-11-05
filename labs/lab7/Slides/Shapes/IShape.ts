import ICanvas from "../Canvas/ICanvas";
import Frame from "../Common/Frame";
import IFillStyle from "../Common/Styles/IFillStyle";
import ILineStyle from "../Common/Styles/ILineStyle";
import IShapeGroup from "../ShapeGroup/IShapeGroup";

interface IShape {
  getFrame(): Frame;
  setFrame(frame: Frame): void;
  getLineStyle(): ILineStyle;
  setLineStyle(style: ILineStyle): void;
  getFillStyle(): IFillStyle;
  setFillStyle(style: IFillStyle): void;
  draw(canvas: ICanvas): void;
  getGroup(): IShapeGroup;
}

export default IShape;
