import ICanvas from "../Canvas/ICanvas";
import IShape from "../Shapes/IShape";
import ISlide from "./ISlide";

class Slide implements ISlide {
  private shapes: IShape[];

  constructor() {
    this.shapes = [];
  }

  public addShape(shape: IShape): void {
    this.shapes.push(shape);
  }

  public draw(canvas: ICanvas): void {
    this.shapes.forEach((shape: IShape) => {
      shape.draw(canvas);
    });
  }
}

export default Slide;
