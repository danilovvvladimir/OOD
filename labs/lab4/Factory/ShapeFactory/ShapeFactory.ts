import Point from "../Point/Point";
import Ellipse from "../Shapes/Ellipse/Ellipse";
import Rectangle from "../Shapes/Rectangle/Rectangle";
import Shape from "../Shapes/Shape";
import Triangle from "../Shapes/Triangle/Triangle";
import { Color } from "../common/Color";
import { IShapeFactory } from "./IShapeFactory";

enum AvailableShapes {
  Ellipse = "ellipse",
  Rectangle = "rectangle",
  Triangle = "triangle",
}

class ShapeFactory implements IShapeFactory {
  private readonly INCORRECT_ARGS_COUNT_MESSAGE: string =
    "Incorrect args count";
  private readonly INCORRECT_SHAPE_NAME_MESSAGE: string =
    "Incorrect shape name";
  private readonly ELLIPSE_ARGS_COUNT: number = 5;
  private readonly RECTANGLE_ARGS_COUNT: number = 5;
  private readonly TRIANGLE_ARGS_COUNT: number = 3;

  public createShape(description: string[]): Shape {
    if (description.length < 1) {
      throw new Error(this.INCORRECT_ARGS_COUNT_MESSAGE);
    }

    switch (description[0]) {
      case AvailableShapes.Ellipse:
        if (description.length !== this.ELLIPSE_ARGS_COUNT) {
          throw new Error(this.INCORRECT_ARGS_COUNT_MESSAGE);
        }
        return this.createEllipse.apply(
          null,
          description.slice(1, description.length),
        );

      case AvailableShapes.Rectangle:
        if (description.length !== this.RECTANGLE_ARGS_COUNT) {
          throw new Error(this.INCORRECT_ARGS_COUNT_MESSAGE);
        }
        return this.createRectangle.apply(
          null,
          description.slice(1, description.length),
        );

      case AvailableShapes.Triangle:
        if (description.length !== this.TRIANGLE_ARGS_COUNT) {
          throw new Error(this.INCORRECT_ARGS_COUNT_MESSAGE);
        }
        return this.createTriangle.apply(
          null,
          description.slice(1, description.length),
        );

      default:
        throw new Error(this.INCORRECT_SHAPE_NAME_MESSAGE);
    }
  }

  private createEllipse(
    centerPoint: Point,
    widthRadius: number,
    heightRadius: number,
    color: Color,
  ): Ellipse {
    return new Ellipse(centerPoint, widthRadius, heightRadius, color);
  }

  private createRectangle(
    leftTopPoint: Point,
    rightBottom: Point,
    color: Color,
  ): Rectangle {
    return new Rectangle(leftTopPoint, rightBottom, color);
  }

  private createTriangle(
    firstVertex: Point,
    secondVertex: Point,
    thirdVertex: Point,
    color: Color,
  ): Triangle {
    return new Triangle(firstVertex, secondVertex, thirdVertex, color);
  }
}

export default ShapeFactory;
