import IInputDataStream from "./IInputStream";

export class CFileMemoryInputStream implements IInputDataStream {
  private memory: Buffer;
  private currentIndex: number = 0;

  constructor(memory: Buffer) {
    this.memory = Buffer.from(memory);
  }

  public isEof(): boolean {
    return this.currentIndex >= this.memory.length;
  }

  public readByte(): Buffer {
    if (this.isEof()) {
      throw new Error("Can not read byte. Detected end of file");
    }

    return Buffer.from([this.memory[this.currentIndex++]]);
  }

  public readBlock(dstBuffer: number[], size: number): number {
    for (let i = 0; i < size; i++) {
      try {
        dstBuffer[i] = this.readByte()[0];
      } catch (e) {
        throw e;
      }
    }

    return size;
  }
}
