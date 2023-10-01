import IInputDataStream from "../InputStream/IInputStream";

export abstract class InputStreamDecorator implements IInputDataStream {
  protected inputStream: IInputDataStream;

  constructor(inputStream: IInputDataStream) {
    this.inputStream = inputStream;
  }

  public isEOF(): boolean {
    return this.inputStream.isEOF();
  }

  public abstract readByte(): Buffer;

  public abstract readBlock(dstBuffer: number[], dataSize: number): number;
}
