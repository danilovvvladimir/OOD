import { IOutputDataStream } from "./IOutputStream";
import { WriteStream, createWriteStream } from "fs";

class FileOutputStream implements IOutputDataStream {
  private fileOutputStream: WriteStream;

  constructor(path: string) {
    this.fileOutputStream = createWriteStream(path);
  }

  public writeByte(byte: Buffer): void {
    for (let i = 0; i < byte.byteLength; i++) {
      this.fileOutputStream.write(Buffer.from([byte[i]]));
    }
  }

  public writeBlock(block: Buffer, size: number): void {
    const writeBuffer = Buffer.alloc(size);
    for (let i = 0; i < size; i++) {
      writeBuffer[i] = block[i];
    }
    this.fileOutputStream.write(writeBuffer);
  }

  public finishTransmitting(): void {}
}

export default FileOutputStream;
