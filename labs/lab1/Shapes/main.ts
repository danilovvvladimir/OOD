// import * as readline from "readline";
import { Canvas } from "./canvas/canvas";
import {
  CommandHandler,
  ShapeDetailsParser,
} from "./commandHandler/commandHandler";
import { Picture } from "./shapes/shapes";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Введите что-нибудь: ", (answer: string) => {
//   console.log(`Вы ввели: ${answer}`);
//   rl.close();
// });

const picture = new Picture(new Canvas());
const shapeDetailsParser = new ShapeDetailsParser();
const commandHandler = new CommandHandler(picture, shapeDetailsParser);

// const commandLine = "AddShape sh1 circle #ff00ff 100 110 15";
const commandLine1 = "AddShape sh1 rectangle #123456 10 20 30b 40c";
const commandLine2 = "DrawPicture";

try {
  commandHandler.handle(commandLine1);
  commandHandler.handle(commandLine2);
} catch (error) {
  const err = error as Error;
  console.log(err.message);
}
// commandHandler.handle(commandLine);
