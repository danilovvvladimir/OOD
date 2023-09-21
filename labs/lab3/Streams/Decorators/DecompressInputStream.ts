import { InputStreamDecorator } from "./InputStreamDecorator";

class DecompressInputStream extends InputStreamDecorator {
  // Декомпрессия RLE-сжатия

  public readByte(): Buffer {
    const readByteCount: Buffer = this.inputStream.readByte();
    const readByte: Buffer = this.inputStream.readByte();

    const readBuffer: Buffer = Buffer.alloc(readByteCount[0]);
    for (let i = 0; i < readByteCount[0]; i++) {
      readBuffer[i] = readByte[0];
    }

    return readBuffer;
  }

  public readBlock(dstBuffer: number[], size: number): number {
    const actualSize: number = this.inputStream.readBlock(
      dstBuffer,
      size % 2 == 0 ? size : 2 * size,
    );

    return this.decompressBlock(dstBuffer, actualSize);
  }

  protected decompressBlock(block: number[], size: number): number {
    const decompressedBlock: number[] = [];
    let bytesCount: number = 0;

    for (let i = 0; i < size; i += 2) {
      try {
        const byteCount: number = block[i];
        const byteValue: number = block[i + 1];
        bytesCount += byteCount;

        for (let j = 0; j < byteCount; j++) {
          decompressedBlock.push(byteValue);
        }
      } catch (e) {
        throw e;
      }
    }

    for (let i = 0; i < decompressedBlock.length; i++) {
      if (i < block.length) {
        block[i] = decompressedBlock[i];
      } else {
        block.push(decompressedBlock[i]);
      }
    }

    return bytesCount;
  }
}

export default DecompressInputStream;
