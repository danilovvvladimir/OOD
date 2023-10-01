import { existsSync, readFileSync } from "fs";
import IInputDataStream from "./IInputStream";

class FileInputStream implements IInputDataStream {
  private bytes: Buffer;
  private currentIndex: number = 0;

  constructor(path: string) {
    if (!existsSync(path)) {
      throw new Error(`File on path = "${path}" doesn't exist`);
    }

    this.bytes = readFileSync(path);
  }

  public isEOF(): boolean {
    return this.currentIndex >= this.bytes.length;
  }

  public readByte(): Buffer {
    if (this.isEOF()) {
      throw new Error("Can not read byte. Detected end of file");
    }

    return Buffer.from([this.bytes[this.currentIndex++]]);
  }

  public readBlock(dstBuffer: number[], dataSize: number): number {
    let bytesRead = 0;

    while (bytesRead < dataSize && !this.isEOF()) {
      try {
        dstBuffer[bytesRead] = this.readByte()[0];
        bytesRead++;
      } catch (e) {
        throw e;
      }
    }

    return bytesRead;
  }
}

export default FileInputStream;
