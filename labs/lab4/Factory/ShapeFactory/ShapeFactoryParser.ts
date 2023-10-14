import Point from "../Point/Point";
import { Color } from "../common/Color";
import { AvailableShapes } from "./ShapeFactory";

export interface IDetails {
  color: Color;
}

interface RectangleDetails extends IDetails {
  type: AvailableShapes.Rectangle;
  leftTop: Point;
  rightBottom: Point;
}

interface TriangleDetails extends IDetails {
  type: AvailableShapes.Triangle;
  firstVertex: Point;
  secondVertex: Point;
  thirdVertex: Point;
}

interface EllipseDetails extends IDetails {
  type: AvailableShapes.Ellipse;
  center: Point;
  widthRadius: number;
  heightRadius: number;
}

class ShapeFactoryParser {
  private readonly INCORRECT_ARGS_COUNT_MESSAGE: string =
    "Incorrect args count";
  private readonly INCORRECT_SHAPE_NAME_MESSAGE: string =
    "Incorrect shape name";
  private readonly ELLIPSE_ARGS_COUNT: number = 6;
  private readonly RECTANGLE_ARGS_COUNT: number = 6;
  private readonly TRIANGLE_ARGS_COUNT: number = 8;

  public parse(description: string) {
    const descriptionArray = description.split(" ");
    const shapeType = descriptionArray[0];

    switch (shapeType) {
      case "rectangle":
        return this.parseRectangleDescription(descriptionArray);

      case "ellipse":
        return this.parseEllipseDescription(descriptionArray);

      case "triangle":
        return this.parseTriangleDescription(descriptionArray);

      default:
        throw new Error(this.INCORRECT_SHAPE_NAME_MESSAGE);
    }
  }

  private parseColor(rawColor: string): Color {
    switch (rawColor) {
      case "red":
        return Color.RED;
      case "green":
        return Color.GREEN;
      case "blue":
        return Color.BLUE;
      case "pink":
        return Color.PINK;
      case "yellow":
        return Color.YELLOW;
      case "black":
        return Color.BLACK;
      default:
        throw new Error("Unknown color");
    }
  }

  private parseRectangleDescription(
    rectangleDescription: string[],
  ): RectangleDetails {
    if (rectangleDescription.length !== this.RECTANGLE_ARGS_COUNT) {
      throw new Error(this.INCORRECT_ARGS_COUNT_MESSAGE);
    }

    const leftTop = new Point(
      +rectangleDescription[1],
      +rectangleDescription[2],
    );

    if (Number.isNaN(leftTop.getX()) || Number.isNaN(leftTop.getY())) {
      throw new Error("leftTop Point's coordinates are not valid numbers");
    }

    const rightBottom = new Point(
      +rectangleDescription[3],
      +rectangleDescription[4],
    );

    if (Number.isNaN(rightBottom.getX()) || Number.isNaN(rightBottom.getY())) {
      throw new Error("rightBottom Point's coordinates are not valid numbers");
    }

    const color = this.parseColor(rectangleDescription[5]);

    return { type: AvailableShapes.Rectangle, leftTop, rightBottom, color };
  }

  private parseEllipseDescription(
    ellipseDescription: string[],
  ): EllipseDetails {
    if (ellipseDescription.length !== this.ELLIPSE_ARGS_COUNT) {
      throw new Error(this.INCORRECT_ARGS_COUNT_MESSAGE);
    }

    const center = new Point(+ellipseDescription[1], +ellipseDescription[2]);

    if (Number.isNaN(center.getX()) || Number.isNaN(center.getY())) {
      throw new Error("center Point's coordinates are not valid numbers");
    }

    const widthRadius = +ellipseDescription[3];

    if (Number.isNaN(widthRadius)) {
      throw new Error("rightBottom Point's coordinates are not valid numbers");
    }

    const heightRadius = +ellipseDescription[4];

    if (Number.isNaN(heightRadius)) {
      throw new Error("rightBottom Point's coordinates are not valid numbers");
    }

    const color = this.parseColor(ellipseDescription[5]);

    return {
      type: AvailableShapes.Ellipse,
      center,
      widthRadius,
      heightRadius,
      color,
    };
  }

  private parseTriangleDescription(
    triangleDescription: string[],
  ): TriangleDetails {
    if (triangleDescription.length !== this.TRIANGLE_ARGS_COUNT) {
      throw new Error(this.INCORRECT_ARGS_COUNT_MESSAGE);
    }

    const firstVertex = new Point(
      +triangleDescription[1],
      +triangleDescription[2],
    );

    if (Number.isNaN(firstVertex.getX()) || Number.isNaN(firstVertex.getY())) {
      throw new Error("firstVertex Point's coordinates are not valid numbers");
    }
    const secondVertex = new Point(
      +triangleDescription[3],
      +triangleDescription[4],
    );

    if (
      Number.isNaN(secondVertex.getX()) ||
      Number.isNaN(secondVertex.getY())
    ) {
      throw new Error("secondVertex Point's coordinates are not valid numbers");
    }
    const thirdVertex = new Point(
      +triangleDescription[5],
      +triangleDescription[6],
    );

    if (Number.isNaN(thirdVertex.getX()) || Number.isNaN(thirdVertex.getY())) {
      throw new Error("thirdVertex Point's coordinates are not valid numbers");
    }

    const color = this.parseColor(triangleDescription[7]);

    return {
      type: AvailableShapes.Triangle,
      color,
      firstVertex,
      secondVertex,
      thirdVertex,
    };
  }
}

export default ShapeFactoryParser;
