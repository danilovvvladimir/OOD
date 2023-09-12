import {
  CircleDetails,
  IShapeDetails,
  LineDetails,
  RectangleDetails,
  ShapeDetails,
  TextDetails,
  TriangleDetails,
} from "../details/details";
import { RectangleDrawingStrategy } from "../drawingStrategy/drawingStrategy";
import { Point } from "../point/point";
import { Picture } from "../shapes/shapes";

namespace CommandHandlers {
  export class ShapeDetailsParser {
    parseRectangleDetails(unparsedDetails: string[]): RectangleDetails {
      if (unparsedDetails.length != 5) {
        throw new Error("Details length for rectangle must be 5");
      }

      const leftTop = new Point(+unparsedDetails[1], +unparsedDetails[2]);
      if (Number.isNaN(leftTop.getX()) || Number.isNaN(leftTop.getY())) {
        throw new Error("Left Top Point's coordinates are not valid numbers");
      }

      const width = +unparsedDetails[3];
      if (Number.isNaN(width)) {
        throw new Error("Rectangle width is not a valid number");
      }

      const height = +unparsedDetails[4];
      if (Number.isNaN(height)) {
        throw new Error("Rectangle height is not a valid number");
      }

      return {
        leftTop,
        color: unparsedDetails[0],
        height,
        width,
      };
    }

    parseCircleDetails(unparsedDetails: string[]): CircleDetails {
      if (unparsedDetails.length != 4) {
        throw new Error("Details length for rectangle must be 4");
      }

      const center = new Point(+unparsedDetails[1], +unparsedDetails[2]);
      if (Number.isNaN(center.getX()) || Number.isNaN(center.getY())) {
        throw new Error("Center Point's coordinates are not valid numbers");
      }

      const radius = +unparsedDetails[3];
      if (Number.isNaN(radius)) {
        throw new Error("Circle radius is not a valid number");
      }

      return {
        center,
        color: unparsedDetails[0],
        radius,
      };
    }

    parseTriangleDetails(unparsedDetails: string[]): TriangleDetails {
      if (unparsedDetails.length != 7) {
        throw new Error("Details length for rectangle must be 7");
      }

      const firstVertex = new Point(+unparsedDetails[1], +unparsedDetails[2]);
      if (
        Number.isNaN(firstVertex.getX()) ||
        Number.isNaN(firstVertex.getY())
      ) {
        throw new Error(
          "FirstVertes Point's coordinates are not valid numbers",
        );
      }
      const secondVertex = new Point(+unparsedDetails[3], +unparsedDetails[4]);
      if (
        Number.isNaN(secondVertex.getX()) ||
        Number.isNaN(secondVertex.getY())
      ) {
        throw new Error(
          "SecondVertex Point's coordinates are not valid numbers",
        );
      }
      const thirdVertex = new Point(+unparsedDetails[5], +unparsedDetails[6]);
      if (
        Number.isNaN(thirdVertex.getX()) ||
        Number.isNaN(thirdVertex.getY())
      ) {
        throw new Error(
          "ThirdVertex Point's coordinates are not valid numbers",
        );
      }

      return {
        firstVertex,
        secondVertex,
        thirdVertex,
        color: unparsedDetails[0],
      };
    }

    parseLineDetails(unparsedDetails: string[]): LineDetails {
      if (unparsedDetails.length != 3) {
        throw new Error("Details length for rectangle must be 3");
      }

      const from = new Point(+unparsedDetails[1], +unparsedDetails[2]);
      if (Number.isNaN(from.getX()) || Number.isNaN(from.getY())) {
        throw new Error("From Point's coordinates are not valid numbers");
      }

      const to = new Point(+unparsedDetails[3], +unparsedDetails[4]);
      if (Number.isNaN(to.getX()) || Number.isNaN(to.getY())) {
        throw new Error("To Point's coordinates are not valid numbers");
      }

      return {
        from,
        to,
        color: unparsedDetails[0],
      };
    }

    parseTextDetails(unparsedDetails: string[]): TextDetails {
      if (unparsedDetails.length != 5) {
        throw new Error("Details length for rectangle must be 5");
      }

      const leftTop = new Point(+unparsedDetails[1], +unparsedDetails[2]);
      if (Number.isNaN(leftTop.getX()) || Number.isNaN(leftTop.getY())) {
        throw new Error("leftTop Point's coordinates are not valid numbers");
      }

      const fontSize = +unparsedDetails[3];
      if (Number.isNaN(fontSize)) {
        throw new Error("fontSize is not valid numbers");
      }

      return {
        leftTop,
        fontSize,
        color: unparsedDetails[0],
        text: unparsedDetails[4],
      };
    }

    parse(details: string[]): ShapeDetails {
      const shapeType = details[0];
      const shapeDetails = details.slice(1);

      switch (shapeType) {
        case "rectangle":
          return this.parseRectangleDetails(shapeDetails);
        case "circle":
          return this.parseCircleDetails(shapeDetails);
        case "triangle":
          return this.parseTriangleDetails(shapeDetails);
        case "line":
          return this.parseLineDetails(shapeDetails);
        case "text":
          return this.parseTextDetails(shapeDetails);

        default:
          throw new Error("unknown type of shape");
      }
    }
  }

  export class CommandHandler {
    private picture: Picture;
    private shapeDetailsParser: ShapeDetailsParser;

    constructor(picture: Picture, shapeDetailsParser: ShapeDetailsParser) {
      this.picture = picture;
      this.shapeDetailsParser = shapeDetailsParser;
    }

    validateCommandLine(commandLine: string) {
      return commandLine.toLowerCase();
    }

    handle(commandLine: string) {
      const commandItems = this.validateCommandLine(commandLine).split(" ");
      const id = commandLine[1];

      switch (commandItems[0]) {
        case "addshape":
          const parsedDetails: ShapeDetails = this.shapeDetailsParser.parse(
            commandItems.slice(2),
          );

          this.picture.addShape(id, new RectangleDrawingStrategy(ShapeDetails));
          break;

        case "drawpicture":
          console.log("drawpicture drawpicture drawpicture");

          this.picture.drawPicture();
          break;

        default:
          console.log("Unkown command");

          break;
      }
    }
  }
}

export = CommandHandlers;
