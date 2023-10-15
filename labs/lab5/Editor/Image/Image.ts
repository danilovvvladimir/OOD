import IImage from "./IImage";

class Image implements IImage {
  private path: string;
  private width: number;
  private height: number;

  constructor(path: string, width: number, height: number) {
    if (width < 0 || height < 0) {
      throw new Error("Width and height can not be negative");
    }

    this.path = path;
    this.width = width;
    this.height = height;
  }

  public getPath(): string {
    return this.path;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }
}
export default Image;
