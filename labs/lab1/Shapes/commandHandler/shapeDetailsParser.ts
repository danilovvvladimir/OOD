import {
  RectangleDetails,
  CircleDetails,
  TriangleDetails,
  LineDetails,
  TextDetails,
} from "../details/details";
import {
  IDrawingStrategy,
  RectangleDrawingStrategy,
  CircleDrawingStrategy,
  TriangleDrawingStrategy,
  LineDrawingStrategy,
  TextDrawingStrategy,
} from "../drawingStrategy/drawingStrategy";
import { Point } from "../point/point";

class ShapeDetailsParser {
  private rectangleDetailsLength = 5;
  private circleDetailsLength = 4;
  private trinagleDetailsLength = 7;
  private lineDetailsLength = 5;
  private textDetailsLength = 5;

  public parseRectangleDetails(unparsedDetails: string[]): RectangleDetails {
    if (unparsedDetails.length != this.rectangleDetailsLength) {
      throw new Error(
        `Details length for rectangle must be ${this.rectangleDetailsLength}`,
      );
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

    const rightBottom = new Point(
      leftTop.getX() + width,
      leftTop.getY() - height,
    );

    return {
      controlPoints: [leftTop, rightBottom],
      color: this.validateColorParam(unparsedDetails[0]),
    };
  }

  public parseCircleDetails(unparsedDetails: string[]): CircleDetails {
    if (unparsedDetails.length != this.circleDetailsLength) {
      throw new Error(
        `Details length for circle must be ${this.circleDetailsLength}`,
      );
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
      controlPoints: [center],
      color: this.validateColorParam(unparsedDetails[0]),
      radius,
    };
  }

  public parseTriangleDetails(unparsedDetails: string[]): TriangleDetails {
    if (unparsedDetails.length != this.trinagleDetailsLength) {
      throw new Error(
        `Details length for triangle must be ${this.trinagleDetailsLength}`,
      );
    }

    const firstVertex = new Point(+unparsedDetails[1], +unparsedDetails[2]);
    if (Number.isNaN(firstVertex.getX()) || Number.isNaN(firstVertex.getY())) {
      throw new Error("FirstVertes Point's coordinates are not valid numbers");
    }
    const secondVertex = new Point(+unparsedDetails[3], +unparsedDetails[4]);
    if (
      Number.isNaN(secondVertex.getX()) ||
      Number.isNaN(secondVertex.getY())
    ) {
      throw new Error("SecondVertex Point's coordinates are not valid numbers");
    }
    const thirdVertex = new Point(+unparsedDetails[5], +unparsedDetails[6]);
    if (Number.isNaN(thirdVertex.getX()) || Number.isNaN(thirdVertex.getY())) {
      throw new Error("ThirdVertex Point's coordinates are not valid numbers");
    }

    return {
      controlPoints: [firstVertex, secondVertex, thirdVertex],
      color: this.validateColorParam(unparsedDetails[0]),
    };
  }

  public parseLineDetails(unparsedDetails: string[]): LineDetails {
    if (unparsedDetails.length != this.lineDetailsLength) {
      throw new Error(
        `Details length for line must be ${this.lineDetailsLength}`,
      );
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
      controlPoints: [from, to],
      color: this.validateColorParam(unparsedDetails[0]),
    };
  }

  public parseTextDetails(unparsedDetails: string[]): TextDetails {
    if (unparsedDetails.length < this.textDetailsLength) {
      throw new Error(
        `Details length for text must be at least${this.textDetailsLength}`,
      );
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
      controlPoints: [leftTop],
      fontSize,
      color: this.validateColorParam(unparsedDetails[0]),
      text: unparsedDetails.slice(4).join(" "),
    };
  }

  public validateIdParam(possibleId: unknown): string {
    if (typeof possibleId !== "string") {
      throw new Error("ID must be a string");
    }

    return possibleId;
  }

  private validateColorParam(possibleColor: unknown): string {
    if (typeof possibleColor !== "string") {
      throw new Error("ID must be a string");
    }

    return this.validateHex(possibleColor);
  }

  public validateHex(possibleHexColor: string): string {
    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

    if (!hexColorRegex.test(possibleHexColor)) {
      throw new Error(
        "Invalid hex color format. It should be in the format #RRGGBB.",
      );
    }

    return possibleHexColor;
  }

  public validateShiftParam(possibleShiftParam: unknown): number {
    if (typeof possibleShiftParam === "string") {
      const parsedShiftParam = parseInt(possibleShiftParam, 10);

      if (Number.isNaN(parsedShiftParam)) {
        throw new Error("DX or DY must valid number");
      }

      return parsedShiftParam;
    } else {
      throw new Error("DX or DY must exist");
    }
  }

  public parse(details: string[]): IDrawingStrategy {
    const shapeType = details[0];
    const shapeDetails = details.slice(1);

    switch (shapeType) {
      case "rectangle":
        return new RectangleDrawingStrategy(
          this.parseRectangleDetails(shapeDetails),
        );
      case "circle":
        return new CircleDrawingStrategy(this.parseCircleDetails(shapeDetails));
      case "triangle":
        return new TriangleDrawingStrategy(
          this.parseTriangleDetails(shapeDetails),
        );
      case "line":
        return new LineDrawingStrategy(this.parseLineDetails(shapeDetails));
      case "text":
        return new TextDrawingStrategy(this.parseTextDetails(shapeDetails));

      default:
        throw new Error("unknown type of shape");
    }
  }
}

export default ShapeDetailsParser;
