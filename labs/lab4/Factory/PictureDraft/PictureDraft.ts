import Shape from "../Shapes/Shape";

class PictureDraft {
  private shapes: Shape[] = [];

  public getShapesSize(): number {
    return this.shapes.length;
  }

  public getShape(index: number): Shape {
    if (index > this.shapes.length) {
      throw new Error("Invalid Index");
    }

    return this.shapes[index];
  }

  public addShape(shape: Shape): void {
    this.shapes.push(shape);
  }
}

export default PictureDraft;
