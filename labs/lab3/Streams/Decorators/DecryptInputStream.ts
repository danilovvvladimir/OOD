import { shuffle } from "../Common/Shuffle";
import IInputStream from "../InputStream/IInputStream";
import { InputStreamDecorator } from "./InputStreamDecorator";

class DecryptInputStream extends InputStreamDecorator {
  private decryptTable: Map<number, number> = new Map<number, number>();
  private readonly ENCODING_TABLE_LENGTH: number = 256;

  constructor(inputStream: IInputStream, key: number) {
    super(inputStream);

    const array: number[] = [];
    for (let i = 0; i < this.ENCODING_TABLE_LENGTH; i++) {
      array.push(i);
    }

    shuffle(array, key);

    for (let i = 0; i < this.ENCODING_TABLE_LENGTH; i++) {
      this.decryptTable.set(array[i], i);
    }
  }

  public readByte(): Buffer {
    return this.decryptByte(this.inputStream.readByte());
  }

  public readBlock(dstBuffer: number[], size: number): number {
    const actualSize: number = this.inputStream.readBlock(dstBuffer, size);

    return this.decryptBlock(dstBuffer, actualSize);
  }

  private decryptByte(byte: Buffer): Buffer {
    return Buffer.from([this.decryptTable.get(byte[0]) ?? byte[0]]);
  }

  private decryptBlock(block: number[], size: number): number {
    for (let i = 0; i < size; i++) {
      block[i] = this.decryptTable.get(block[i]) ?? block[i];
    }

    return size;
  }
}

export default DecryptInputStream;
