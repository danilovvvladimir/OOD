import IOutputStream from "../OutputStream/IOutputStream";

export abstract class OutputStreamDecorator implements IOutputStream {
  protected outputStream: IOutputStream;

  constructor(outputStream: IOutputStream) {
    this.outputStream = outputStream;
  }

  public abstract writeByte(data: Buffer): void;

  public abstract writeBlock(srcData: Buffer, dataSize: number): void;

  public abstract flush(): void;
}
