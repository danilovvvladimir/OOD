interface IInputDataStream {
  isEOF(): boolean;
  readByte(): Buffer;
  readBlock(dstBuffer: number[], dataSize: number): number;
}

export default IInputDataStream;
