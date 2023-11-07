import IEnumerator from "../Enumerator/IEnumerator";
import { IShapeEnumerable } from "./IShapeEnumerable";

class ShapeEnumerator implements IEnumerator {
  private shapes: IShapeEnumerable[];
  private currentIndex: number;

  constructor(shapes: IShapeEnumerable[]) {
    this.shapes = shapes;
    this.currentIndex = 0;
  }

  public reset(): void {
    this.currentIndex = 0;
  }

  public hasNext(): boolean {
    return this.currentIndex < this.shapes.length;
  }

  public next(): IShapeEnumerable {
    if (!this.hasNext()) {
      throw new Error("There is no next elements");
    }

    return this.shapes[this.currentIndex++];
  }
}

export default ShapeEnumerator;
