import IInputDataStream from "../InputStream/IInputStream";

export abstract class InputStreamDecorator implements IInputDataStream {
  protected inputStream: IInputDataStream;

  constructor(inputStream: IInputDataStream) {
    this.inputStream = inputStream;
  }

  public isEof(): boolean {
    return this.inputStream.isEof();
  }

  public abstract readByte(): Buffer;

  public abstract readBlock(dstBuffer: number[], size: number): number;
}
