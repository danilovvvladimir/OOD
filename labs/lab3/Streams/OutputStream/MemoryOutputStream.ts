import { IOutputDataStream } from "./IOutputStream";

export class CMemoryOutputStream implements IOutputDataStream {
  private memory: Buffer;
  private currentIndex: number;
  private size: number;

  constructor(memory: Buffer) {
    this.memory = Buffer.from(memory);
    this.currentIndex = 0;
    this.size = memory.length;
  }

  public writeByte(byte: Buffer): void {
    if (this.currentIndex >= this.size) {
      throw new Error("Memory allocation error. Not enough space in memory");
    }

    for (let i = 0; i < byte.byteLength; i++) {
      this.memory[this.currentIndex] = byte[i];
      this.currentIndex++;
    }
  }

  public writeBlock(block: Buffer, size: number): void {
    if (this.currentIndex + size >= this.size) {
      throw new Error("Memory allocation error. Not enough space in memory");
    }

    for (let i = 0; i < size; i++) {
      this.memory[this.currentIndex] = block[i];
      this.currentIndex++;
    }
  }

  public finishTransmitting(): void {}
}
