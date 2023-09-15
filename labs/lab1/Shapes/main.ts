import { Canvas, SvgCanvas } from "./canvas/canvas";
import { CommandHandler } from "./commandHandler/commandHandler";
import { Shapes } from "./shapes/shapes";

const picture = new Shapes.Picture(new SvgCanvas("random-file.svg"));
// const picture = new Shapes.Picture(new Canvas());
const commandHandler = new CommandHandler(
  process.stdin,
  process.stdout,
  picture,
);

commandHandler.readInput();

// commands
// AddShape c1 circle #febb38 100 200 25
// AddShape sh1 rectangle #123456 10 20 30 40
// AddShape tr1 triangle #00fefe 0 0 10 0 0 10
// AddShape txt1 text #ffaa88 100.3 100.2 12.8 Hello world
// AddShape ln1 line #000000 10 20 50 50

// MoveShape c1 1000 1000

// MovePicture 1000 1000

// DeleteShape c1

// ChangeColor c1 #000222
// ChangeShape c1 text #ffaa88 100.3 100.2 12.8 Hello world

// DrawShape c1
// DrawPicture

// List
// Clear
// Exit
