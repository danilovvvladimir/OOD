import Shape from "../Shapes/Shape";

export interface IShapeFactory {
  createShape(description: string): Shape;
}
