interface IOutputStream {
  writeByte(data: Buffer): void;
  writeBlock(srcData: Buffer, dataSize: number): void;
  flush(): void;
}

export default IOutputStream;
