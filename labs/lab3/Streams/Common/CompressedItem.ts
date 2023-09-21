class CompressedItem {
  public byte: Buffer;
  public size: number;

  constructor(byte: Buffer, size: number) {
    this.byte = byte;
    this.size = size;
  }
}

export default CompressedItem;
