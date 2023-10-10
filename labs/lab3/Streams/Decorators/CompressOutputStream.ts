import CompressedItem from "../Common/CompressedItem";
import { OutputStreamDecorator } from "./OutputStreamDecorator";

class CompressOutputStream extends OutputStreamDecorator {
  private compressedItem: CompressedItem = new CompressedItem(
    Buffer.alloc(1),
    0,
  );

  public writeByte(data: Buffer): void {
    if (this.compressedItem.size === 0) {
      this.compressedItem = new CompressedItem(data, 1);
      return;
    }

    if (this.compressedItem.byte[0] === data[0]) {
      this.compressedItem.size++;
      // если будет переполнение счетчика
    } else {
      this.outputStream.writeByte(Buffer.from([this.compressedItem.size]));
      this.outputStream.writeByte(this.compressedItem.byte);

      this.compressedItem = new CompressedItem(data, 1);
      // не пересоздавать
    }
  }

  public writeBlock(srcData: Buffer, dataSize: number): void {
    for (let i = 0; i < dataSize; i++) {
      this.writeByte(Buffer.from([srcData[i]]));
    }
  }

  public flush(): void {
    if (this.compressedItem.size != 0) {
      this.outputStream.writeByte(Buffer.from([this.compressedItem.size]));
      this.outputStream.writeByte(this.compressedItem.byte);

      this.compressedItem = new CompressedItem(Buffer.alloc(1), 0);
    }
  }
}

export default CompressOutputStream;
