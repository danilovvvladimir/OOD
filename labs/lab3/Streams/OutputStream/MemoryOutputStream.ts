import IOutputDataStream from "./IOutputStream";

export class CMemoryOutputStream implements IOutputDataStream {
  private memory: Buffer;
  private currentIndex: number;
  private size: number;

  constructor(memory: Buffer) {
    this.memory = Buffer.from(memory);
    this.currentIndex = 0;
    this.size = memory.length;
  }

  public writeByte(data: Buffer): void {
    if (this.currentIndex >= this.size) {
      throw new Error("Memory allocation error. Not enough space in memory");
    }

    for (let i = 0; i < data.byteLength; i++) {
      this.memory[this.currentIndex] = data[i];
      this.currentIndex++;
    }
  }

  public writeBlock(srcData: Buffer, dataSize: number): void {
    if (this.currentIndex + dataSize >= this.size) {
      throw new Error("Memory allocation error. Not enough space in memory");
    }

    for (let i = 0; i < dataSize; i++) {
      this.memory[this.currentIndex] = srcData[i];
      this.currentIndex++;
    }
  }

  public flush(): void {}
}
