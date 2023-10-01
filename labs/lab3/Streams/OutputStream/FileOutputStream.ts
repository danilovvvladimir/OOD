import IOutputStream from "./IOutputStream";
import { WriteStream, createWriteStream } from "fs";

class FileOutputStream implements IOutputStream {
  private fileOutputStream: WriteStream;

  constructor(path: string) {
    this.fileOutputStream = createWriteStream(path);
  }

  public writeByte(data: Buffer): void {
    for (let i = 0; i < data.byteLength; i++) {
      this.fileOutputStream.write(Buffer.from([data[i]]));
    }
  }

  public writeBlock(srcData: Buffer, dataSize: number): void {
    const writeBuffer = Buffer.alloc(dataSize);

    for (let i = 0; i < dataSize; i++) {
      writeBuffer[i] = srcData[i];
    }

    this.fileOutputStream.write(writeBuffer);
  }

  public flush(): void {}
}

export default FileOutputStream;
