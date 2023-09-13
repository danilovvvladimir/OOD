import * as readline from "readline";
import { Canvas } from "./canvas/canvas";
import { CommandHandler } from "./commandHandler/commandHandler";
import { Picture } from "./shapes/shapes";

const picture = new Picture(new Canvas());
const commandHandler = new CommandHandler(picture);

// commands
// AddShape c1 circle #febb38 100 200 25
// AddShape sh1 rectangle #123456 10 20 30 40
// AddShape tr1 triangle #00fefe 0 0 10 0 0 10
// AddShape txt1 text #ffaa88 100.3 100.2 12.8 Hello world
// AddShape ln1 line #fefefe 10 20 35 -88

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
