import * as readline from "readline";
import { Canvas } from "./canvas/canvas";
import { CommandHandler } from "./commandHandler/commandHandler";
import { Picture } from "./shapes/shapes";

const picture = new Picture(new Canvas());
const commandHandler = new CommandHandler(picture);

// const commandLine1 = "AddShape sh1 rectangle #123456 10 20 30 40";
// const commandLine2 = "DrawPicture";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readInput() {
  rl.question(">", (input) => {
    if (input === "exit") {
      rl.close();
    } else {
      try {
        commandHandler.handle(input);
      } catch (error) {
        const err = error as Error;
        console.log(err.message);
      }
      readInput();
    }
  });
}

readInput();
