import CompressOutputStream from "./Decorators/CompressOutputStream";
import DecompressInputStream from "./Decorators/DecompressInputStream";
import DecryptInputStream from "./Decorators/DecryptInputStream";
import EncryptOutputStream from "./Decorators/EncryptOuputStream";
import FileInputStream from "./InputStream/FileInputStream";
import IInputDataStream from "./InputStream/IInputStream";
import FileOutputStream from "./OutputStream/FileOutputStream";
import { IOutputDataStream } from "./OutputStream/IOutputStream";

enum ArgsOption {
  Encrypt = "--encrypt",
  Decrypt = "--decrypt",
  Compress = "--compress",
  Decompress = "--decompress",
}

const DEFAULT_BLOCK_SIZE: number = 4;
const cliArgs: string[] = process.argv.slice(2);

export function run(args: string[]) {
  try {
    if (args.length < 2) {
      throw new Error(
        "Invalid arguments count, count should be greater than 1",
      );
    }
    let inputStream: IInputDataStream = new FileInputStream(
      args[args.length - 2],
    );
    let outputStream: IOutputDataStream = new FileOutputStream(
      args[args.length - 1],
    );

    let i = 0;
    while (i < args.length - 2) {
      switch (args[i]) {
        case ArgsOption.Decrypt:
          if (++i >= args.length - 2) {
            throw new Error("Not provided key for decryption");
          }
          const decryptKey: number = Number(args[i]);
          inputStream = new DecryptInputStream(inputStream, decryptKey);
          break;
        case ArgsOption.Encrypt:
          if (++i >= args.length - 2) {
            throw new Error("Not provided key for encryption");
          }
          const encryptKey: number = Number(args[i]);
          outputStream = new EncryptOutputStream(outputStream, encryptKey);
          break;
        case ArgsOption.Compress:
          outputStream = new CompressOutputStream(outputStream);
          break;
        case ArgsOption.Decompress:
          inputStream = new DecompressInputStream(inputStream);
          break;
        default:
          throw new Error("Invalid argument");
      }
      i++;
    }

    while (!inputStream.isEof()) {
      const buff: number[] = [];
      const actualBlockSize: number = inputStream.readBlock(
        buff,
        DEFAULT_BLOCK_SIZE,
      );
      outputStream.writeBlock(Buffer.from(buff), actualBlockSize);
    }

    outputStream.finishTransmitting();
  } catch (e) {
    console.log(e.message);
  }
}

run(cliArgs);
