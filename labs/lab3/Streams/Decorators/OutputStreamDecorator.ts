import IOutputDataStream from "../OutputStream/IOutputStream";

export abstract class OutputStreamDecorator implements IOutputDataStream {
  protected outputStream: IOutputDataStream;

  constructor(outputStream: IOutputDataStream) {
    this.outputStream = outputStream;
  }

  public abstract writeByte(data: Buffer): void;

  public abstract writeBlock(srcData: Buffer, dataSize: number): void;

  public abstract flush(): void;
}
