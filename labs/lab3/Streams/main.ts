import CompressOutputStream from "./Decorators/CompressOutputStream";
import DecompressInputStream from "./Decorators/DecompressInputStream";
import DecryptInputStream from "./Decorators/DecryptInputStream";
import EncryptOutputStream from "./Decorators/EncryptOuputStream";
import FileInputStream from "./InputStream/FileInputStream";
import IInputDataStream from "./InputStream/IInputStream";
import FileOutputStream from "./OutputStream/FileOutputStream";
import IOutputDataStream from "./OutputStream/IOutputStream";

enum ArgsOption {
  Encrypt = "--encrypt",
  Decrypt = "--decrypt",
  Compress = "--compress",
  Decompress = "--decompress",
}

const DEFAULT_BLOCK_SIZE: number = 4;
const ARGS_FILES_PARAMS_LENGTH: number = 2;
const cliArgs: string[] = process.argv.slice(2);

function main(args: string[]) {
  try {
    if (args.length < ARGS_FILES_PARAMS_LENGTH) {
      throw new Error(
        "Invalid arguments count, count should be greater than 1",
      );
    }

    let inputStream: IInputDataStream = new FileInputStream(
      args[args.length - ARGS_FILES_PARAMS_LENGTH],
    );

    let outputStream: IOutputDataStream = new FileOutputStream(
      args[args.length - (ARGS_FILES_PARAMS_LENGTH - 1)],
    );

    let currentArgIndex = 0;

    while (currentArgIndex < args.length - ARGS_FILES_PARAMS_LENGTH) {
      switch (args[currentArgIndex]) {
        case ArgsOption.Decrypt:
          currentArgIndex++;
          if (currentArgIndex >= args.length - ARGS_FILES_PARAMS_LENGTH) {
            throw new Error("Key for decryption is not provided");
          }

          const decryptKey: number = Number(args[currentArgIndex]);
          inputStream = new DecryptInputStream(inputStream, decryptKey);

          break;
        case ArgsOption.Encrypt:
          currentArgIndex++;
          if (currentArgIndex >= args.length - ARGS_FILES_PARAMS_LENGTH) {
            throw new Error("Key for encryption is not provided");
          }

          const encryptKey: number = Number(args[currentArgIndex]);
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

      currentArgIndex++;
    }

    while (!inputStream.isEOF()) {
      const buff: number[] = [];
      const actualBlockSize: number = inputStream.readBlock(
        buff,
        DEFAULT_BLOCK_SIZE,
      );

      outputStream.writeBlock(Buffer.from(buff), actualBlockSize);
    }

    outputStream.flush();
  } catch (e) {
    console.log(e.message);
  }
}

main(cliArgs);
