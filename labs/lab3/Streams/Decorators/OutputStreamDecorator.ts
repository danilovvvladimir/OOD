import { IOutputDataStream } from "../OutputStream/IOutputStream";

export abstract class OutputStreamDecorator implements IOutputDataStream {
  protected outputStream: IOutputDataStream;

  constructor(outputStream: IOutputDataStream) {
    this.outputStream = outputStream;
  }

  public abstract writeByte(byte: Buffer): void;

  public abstract writeBlock(block: Buffer, size: number): void;

  public abstract finishTransmitting(): void;
}
