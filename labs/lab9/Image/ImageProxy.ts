import Size from "../Common/Size";
import IImage from "./IImage";

class ImageProxy implements IImage {
  getSize(): Size {
    throw new Error("Method not implemented.");
  }
  draw(): void {
    throw new Error("Method not implemented.");
  }
}

export default ImageProxy;
