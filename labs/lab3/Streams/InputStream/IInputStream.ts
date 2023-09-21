interface IInputDataStream {
  isEof(): boolean;
  readByte(): Buffer;
  readBlock(dstBuffer: number[], size: number): number;
}

export default IInputDataStream;
