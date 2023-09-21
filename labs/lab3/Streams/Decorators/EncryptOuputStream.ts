import { shuffle } from "../Common/Shuffle";
import { IOutputDataStream } from "../OutputStream/IOutputStream";
import { OutputStreamDecorator } from "./OutputStreamDecorator";

class EncryptOutputStream extends OutputStreamDecorator {
  private encryptTable: Map<number, number> = new Map<number, number>();
  private readonly ENCODING_TABLE_LENGTH: number = 256;

  constructor(inputStream: IOutputDataStream, key: number) {
    super(inputStream);
    const array: number[] = [];
    for (let i = 0; i < this.ENCODING_TABLE_LENGTH; i++) {
      array.push(i);
    }

    shuffle(array, key);

    for (let i = 0; i < this.ENCODING_TABLE_LENGTH; i++) {
      this.encryptTable.set(i, array[i]);
    }
  }

  public writeByte(byte: Buffer): void {
    this.outputStream.writeByte(this.encryptByte(byte));
  }

  public writeBlock(block: Buffer, size: number): void {
    const newBuffer: Buffer = this.encryptBlock(block, size);
    this.outputStream.writeBlock(newBuffer, newBuffer.length);
  }

  public encryptByte(byte: Buffer): Buffer {
    return Buffer.from([this.encryptTable.get(byte[0]) ?? byte[0]]);
  }

  public encryptBlock(block: Buffer, size: number): Buffer {
    const encryptedBuffer = Buffer.alloc(size);

    for (let i = 0; i < size; i++) {
      encryptedBuffer[i] = this.encryptTable.get(block[i]) ?? block[i];
    }

    return encryptedBuffer;
  }

  public finishTransmitting(): void {}
}

export default EncryptOutputStream;
