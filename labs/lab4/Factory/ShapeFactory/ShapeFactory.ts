import Point from "../Point/Point";
import Ellipse from "../Shapes/Ellipse/Ellipse";
import Rectangle from "../Shapes/Rectangle/Rectangle";
import Shape from "../Shapes/Shape";
import Triangle from "../Shapes/Triangle/Triangle";
import { Color } from "../common/Color";
import { IShapeFactory } from "./IShapeFactory";
import ShapeFactoryParser from "./ShapeFactoryParser";

export enum AvailableShapes {
  Ellipse = "ellipse",
  Rectangle = "rectangle",
  Triangle = "triangle",
}

class ShapeFactory implements IShapeFactory {
  private readonly EMPTY_ARGS_COUNT_MESSAGE: string = "Args can not be empty";
  private readonly INCORRECT_SHAPE_NAME_MESSAGE: string =
    "Incorrect shape name";
  private shapeFactoryParser = new ShapeFactoryParser();

  public createShape(description: string): Shape {
    if (description.length < 1) {
      throw new Error(this.EMPTY_ARGS_COUNT_MESSAGE);
    }

    const parsedDetails = this.shapeFactoryParser.parse(description);

    switch (parsedDetails.type) {
      case AvailableShapes.Ellipse:
        return this.createEllipse(
          parsedDetails.center,
          parsedDetails.widthRadius,
          parsedDetails.heightRadius,
          parsedDetails.color,
        );

      case AvailableShapes.Rectangle:
        return this.createRectangle(
          parsedDetails.leftTop,
          parsedDetails.rightBottom,
          parsedDetails.color,
        );

      case AvailableShapes.Triangle:
        return this.createTriangle(
          parsedDetails.firstVertex,
          parsedDetails.secondVertex,
          parsedDetails.thirdVertex,
          parsedDetails.color,
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
    console.log("rectangle created with", leftTopPoint, rightBottom, color);

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
