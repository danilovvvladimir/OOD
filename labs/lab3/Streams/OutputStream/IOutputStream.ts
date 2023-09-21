export interface IOutputDataStream {
  writeByte(data: Buffer): void;
  writeBlock(data: Buffer, size: number): void;
  finishTransmitting(): void;
}
