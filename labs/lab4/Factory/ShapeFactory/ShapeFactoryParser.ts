class ShapeFactoryParser {
  private readonly INCORRECT_ARGS_COUNT_MESSAGE: string =
    "Incorrect args count";
  private readonly INCORRECT_SHAPE_NAME_MESSAGE: string =
    "Incorrect shape name";
  private readonly ELLIPSE_ARGS_COUNT: number = 5;
  private readonly RECTANGLE_ARGS_COUNT: number = 5;
  private readonly TRIANGLE_ARGS_COUNT: number = 3;

  public parse(description: string): string[] {
    const shapeType = description[0];

    switch (shapeType) {
      case "rectangle":
        return [...description.split(" ")];
      case "circle":
        return [...description.split(" ")];
      case "triangle":
        return [...description.split(" ")];

      default:
        throw new Error("Unknown type of shape");
    }
  }

  private parseRectangleDescription(rectangleDescription: string[]): string[] {
    if (rectangleDescription.length !== this.RECTANGLE_ARGS_COUNT) {
      throw new Error(this.INCORRECT_ARGS_COUNT_MESSAGE);
    }
  }
}

export default ShapeFactoryParser;
