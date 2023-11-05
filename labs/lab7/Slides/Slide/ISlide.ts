import ICanvas from "../Canvas/ICanvas";
import IShape from "../Shapes/IShape";

interface ISlide {
  addShape(shape: IShape): void;
  draw(canvas: ICanvas): void;
}

export default ISlide;
