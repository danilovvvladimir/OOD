import { promises } from "fs";
import { main } from "./main";

test("compress + decompress equals initial input", async () => {
  main([
    "--compress",
    "labs/lab3/Streams/TestFiles/compress-decompress/input.txt",
    "labs/lab3/Streams/TestFiles/compress-decompress/output-middle.txt",
  ]);

  main([
    "--decompress",
    "labs/lab3/Streams/TestFiles/compress-decompress/output-middle.txt",
    "labs/lab3/Streams/TestFiles/compress-decompress/output.txt",
  ]);

  const initialInput = await promises.readFile(
    "labs/lab3/Streams/TestFiles/compress-decompress/input.txt",
    "ascii",
  );

  const finalInput = await promises.readFile(
    "labs/lab3/Streams/TestFiles/compress-decompress/output.txt",
    "ascii",
  );

  expect(finalInput).toEqual(initialInput);
});

test("encrypt + decrypt equals initial input", async () => {
  main([
    "--encrypt",
    "15",
    "labs/lab3/Streams/TestFiles/encrypt-decrypt/input.txt",
    "labs/lab3/Streams/TestFiles/encrypt-decrypt/encrypted-output.txt",
  ]);

  main([
    "--decrypt",
    "15",
    "labs/lab3/Streams/TestFiles/encrypt-decrypt/encrypted-output.txt",
    "labs/lab3/Streams/TestFiles/encrypt-decrypt/decrypted-output.txt",
  ]);

  const initialInput = await promises.readFile(
    "labs/lab3/Streams/TestFiles/encrypt-decrypt/input.txt",
    "ascii",
  );

  const finalOutput = await promises.readFile(
    "labs/lab3/Streams/TestFiles/encrypt-decrypt/decrypted-output.txt",
    "ascii",
  );

  expect(finalOutput).toEqual(initialInput);
});

test("multiple encrypt + decrypt equals initial input", async () => {
  main([
    "--encrypt",
    "15",
    "--encrypt",
    "142",
    "labs/lab3/Streams/TestFiles/multiple-encrypt-decrypt/input.txt",
    "labs/lab3/Streams/TestFiles/multiple-encrypt-decrypt/encrypted-output.txt",
  ]);

  main([
    "--decrypt",
    "15",
    "--decrypt",
    "142",
    "labs/lab3/Streams/TestFiles/multiple-encrypt-decrypt/encrypted-output.txt",
    "labs/lab3/Streams/TestFiles/multiple-encrypt-decrypt/decrypted-output.txt",
  ]);

  const initialInput = await promises.readFile(
    "labs/lab3/Streams/TestFiles/multiple-encrypt-decrypt/input.txt",
    "ascii",
  );

  const finalOutput = await promises.readFile(
    "labs/lab3/Streams/TestFiles/multiple-encrypt-decrypt/decrypted-output.txt",
    "ascii",
  );

  expect(finalOutput).toEqual(initialInput);
});

test("multiple encrypt + decrypt and compress + decompress equals initial input", async () => {
  main([
    "--encrypt",
    "15",
    "--encrypt",
    "142",
    "--compress",
    "labs/lab3/Streams/TestFiles/multiple-encrypt-decrypt-compress-decompress/input.txt",
    "labs/lab3/Streams/TestFiles/multiple-encrypt-decrypt-compress-decompress/encrypted-output.txt",
  ]);

  main([
    "--decrypt",
    "15",
    "--decrypt",
    "142",
    "--decompress",
    "labs/lab3/Streams/TestFiles/multiple-encrypt-decrypt-compress-decompress/encrypted-output.txt",
    "labs/lab3/Streams/TestFiles/multiple-encrypt-decrypt-compress-decompress/decrypted-output.txt",
  ]);

  const initialInput = await promises.readFile(
    "labs/lab3/Streams/TestFiles/multiple-encrypt-decrypt-compress-decompress/input.txt",
    "ascii",
  );

  const finalOutput = await promises.readFile(
    "labs/lab3/Streams/TestFiles/multiple-encrypt-decrypt-compress-decompress/decrypted-output.txt",
    "ascii",
  );

  expect(finalOutput).toEqual(initialInput);
});
