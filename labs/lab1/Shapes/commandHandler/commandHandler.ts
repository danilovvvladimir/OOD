import { Picture } from "../shapes/shapes";
import ShapeDetailsParser from "./shapeDetailsParser";

export class CommandHandler {
  private inputStream: NodeJS.ReadStream;
  private outputStream: NodeJS.WriteStream;
  private picture: Picture;
  private shapeDetailsParser: ShapeDetailsParser = new ShapeDetailsParser();

  constructor(picture: Picture) {
    this.picture = picture;
  }

  validateCommandLine(commandLine: string) {
    return commandLine.toLowerCase().trim();
  }

  handle(commandLine: string) {
    const commandItems = this.validateCommandLine(commandLine).split(" ");

    switch (commandItems[0]) {
      case "addshape":
        this.picture.addShape(
          commandItems[1],
          this.shapeDetailsParser.parse(commandItems.slice(2)),
        );
        break;

      case "list":
        this.picture.list();
        break;

      case "deleteshape":
        this.picture.deleteShape(commandItems[1]);
        break;

      case "drawpicture":
        this.picture.drawPicture();
        break;

      case "drawshape":
        this.picture.drawShape(commandItems[1]);
        break;

      case "changeshape":
        this.picture.changeShape(
          commandItems[1],
          this.shapeDetailsParser.parse(commandItems.slice(2)),
        );
        break;

      case "changecolor":
        this.picture.changeColor("id", "color");
        break;

      case "moveshape":
        this.picture.moveShape(
          commandItems[1],
          +commandItems[2],
          +commandItems[3],
        );
        break;

      case "movepicture":
        this.picture.movePicture(+commandItems[1], +commandItems[2]);
        break;

      default:
        throw new Error("Unknown command");
    }
  }
}
