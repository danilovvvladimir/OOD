import IInputStream from "../InputStream/IInputStream";

export abstract class InputStreamDecorator implements IInputStream {
  protected inputStream: IInputStream;

  constructor(inputStream: IInputStream) {
    this.inputStream = inputStream;
  }

  public isEOF(): boolean {
    return this.inputStream.isEOF();
  }

  public abstract readByte(): Buffer;

  public abstract readBlock(dstBuffer: number[], dataSize: number): number;
}
