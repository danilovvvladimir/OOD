import IShape from "../Shapes/IShape";

interface IShapeGroup extends IShape {
  getShapesCount(): number;
  getShapeAtIndex(index: number): IShape;
  insertShape(shape: IShape, index: number): void;
  removeShapeAtIndex(index: number): void;
}

export default IShapeGroup;
