import { Shapes } from "../shapes/shapes";
import ShapeDetailsParser from "./shapeDetailsParser";

export class CommandHandler {
  constructor(
    private inputStream: NodeJS.ReadStream,
    private outputStream: NodeJS.WriteStream,
    private picture: Shapes.Picture,
    private shapeDetailsParser: ShapeDetailsParser = new ShapeDetailsParser(),
  ) {}

  private clearConsole() {
    this.outputStream.write("\x1B[2J\x1B[H");
  }

  readInput() {
    this.inputStream.on("data", (data) => {
      const input = data.toString().trim();

      if (input === "exit") {
        this.inputStream.destroy();
      } else {
        try {
          this.handleCommandLine(input);
        } catch (error) {
          const err = error as Error;
          this.outputStream.write(err.message + "\n");
        }
      }
    });

    this.inputStream.on("error", (err) => {
      this.outputStream.write("Error reading input:" + err + "\n");
    });
  }

  private validateCommandLine(commandLine: string) {
    return commandLine.toLowerCase().trim();
  }

  private handleCommandLine(commandLine: string) {
    const commandItems = this.validateCommandLine(commandLine).split(" ");

    switch (commandItems[0]) {
      case "addshape":
        this.picture.addShape(
          this.shapeDetailsParser.validateIdParam(commandItems[1]),
          this.shapeDetailsParser.parse(commandItems.slice(2)),
        );
        break;

      case "list":
        this.outputStream.write(this.picture.list() + "\n");
        break;

      case "deleteshape":
        this.picture.deleteShape(
          this.shapeDetailsParser.validateIdParam(commandItems[1]),
        );
        break;

      case "drawpicture":
        this.picture.drawPicture();
        break;

      case "drawshape":
        this.picture.drawShape(
          this.shapeDetailsParser.validateIdParam(
            this.shapeDetailsParser.validateIdParam(commandItems[1]),
          ),
        );
        break;

      case "changeshape":
        this.picture.changeShape(
          this.shapeDetailsParser.validateIdParam(commandItems[1]),
          this.shapeDetailsParser.parse(commandItems.slice(2)),
        );
        break;

      case "changecolor":
        this.picture.changeColor(
          this.shapeDetailsParser.validateIdParam(commandItems[1]),
          this.shapeDetailsParser.validateHex(commandItems[2]),
        );
        break;

      case "moveshape":
        this.picture.moveShape(
          this.shapeDetailsParser.validateIdParam(commandItems[1]),
          this.shapeDetailsParser.validateShiftParam(commandItems[2]),
          this.shapeDetailsParser.validateShiftParam(commandItems[3]),
        );
        break;

      case "movepicture":
        this.picture.movePicture(
          this.shapeDetailsParser.validateShiftParam(commandItems[1]),
          this.shapeDetailsParser.validateShiftParam(commandItems[2]),
        );
        break;

      case "clear":
        this.clearConsole();
        break;

      default:
        throw new Error("Unknown command");
    }
  }
}
