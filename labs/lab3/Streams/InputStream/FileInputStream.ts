import { existsSync, readFileSync } from "fs";
import IInputDataStream from "./IInputStream";

class FileInputStream implements IInputDataStream {
  private bytes: Buffer;
  private currentIndex: number = 0;

  constructor(path: string) {
    if (!existsSync(path)) {
      throw new Error(`File on path = "${path}" is not exists`);
    }

    const fileContent: Buffer = readFileSync(path);
    this.bytes = Buffer.from(fileContent);
  }

  public isEof(): boolean {
    return this.currentIndex >= this.bytes.length;
  }

  public readByte(): Buffer {
    if (this.isEof()) {
      throw new Error("Can not read byte. Detected end of file");
    }

    return Buffer.from([this.bytes[this.currentIndex++]]);
  }

  public readBlock(dstBuffer: number[], size: number): number {
    let i = 0;
    while (i < size && !this.isEof()) {
      try {
        dstBuffer[i] = this.readByte()[0];
      } catch (e) {
        throw e;
      }
      i++;
    }

    return i;
  }
}

export default FileInputStream;
