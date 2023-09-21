import CompressedItem from "../Common/CompressedItem";
import { OutputStreamDecorator } from "./OutputStreamDecorator";

class CompressOutputStream extends OutputStreamDecorator {
  private compressedItem: CompressedItem = new CompressedItem(
    Buffer.alloc(1),
    0,
  );

  public writeByte(byte: Buffer): void {
    if (this.compressedItem.size === 0) {
      this.compressedItem = new CompressedItem(byte, 1);
    } else {
      if (this.compressedItem.byte[0] === byte[0]) {
        this.compressedItem.size++;
      } else {
        this.outputStream.writeByte(Buffer.from([this.compressedItem.size]));
        this.outputStream.writeByte(this.compressedItem.byte);

        this.compressedItem = new CompressedItem(byte, 1);
      }
    }
  }

  public writeBlock(block: Buffer, size: number): void {
    for (let i = 0; i < size; i++) {
      this.writeByte(Buffer.from([block[i]]));
    }
  }

  public finishTransmitting(): void {
    if (this.compressedItem.size != 0) {
      this.outputStream.writeByte(Buffer.from([this.compressedItem.size]));
      this.outputStream.writeByte(this.compressedItem.byte);

      this.compressedItem = new CompressedItem(Buffer.alloc(1), 0);
    }
  }
}

export default CompressOutputStream;
