import IInputStream from "./IInputStream";

export class FileMemoryInputStream implements IInputStream {
  private memory: Buffer;
  private currentIndex: number = 0;

  constructor(memory: Buffer) {
    this.memory = Buffer.from(memory);
  }

  public isEOF(): boolean {
    return this.currentIndex >= this.memory.length;
  }

  public readByte(): Buffer {
    if (this.isEOF()) {
      throw new Error("Can not read byte. Detected end of file");
    }

    return Buffer.from([this.memory[this.currentIndex++]]);
  }

  public readBlock(dstBuffer: number[], dataSize: number): number {
    for (let i = 0; i < dataSize; i++) {
      try {
        dstBuffer[i] = this.readByte()[0];
      } catch (e) {
        throw e;
      }
    }

    return dataSize;
  }
}
