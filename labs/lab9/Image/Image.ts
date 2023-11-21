import Size from "../Common/Size";
import IImage from "./IImage";

class Image implements IImage {
  private size: Size;

  constructor() {
    // Decode image
  }

  public getSize(): Size {
    return this.size;
  }

  public draw(): void {
    console.log("Drawing an image");
  }
}

export default Image;
