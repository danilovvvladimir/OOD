import IEnumerable from "../Enumerator/IEnumerable";
import IShape from "./IShape";

export interface IShapeEnumerable extends IShape, IEnumerable {}
