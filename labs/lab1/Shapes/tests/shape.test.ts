import { ICanvas } from "../canvas/canvas";
import {
  CircleDrawingStrategy,
  LineDrawingStrategy,
  RectangleDrawingStrategy,
} from "../drawingStrategy/drawingStrategy";
import { Point } from "../point/point";
import { Shapes } from "../shapes/shapes";

class Canvas implements ICanvas {
  setColor(color: string): void {
    console.log(`Setted color ${color}`);
  }

  moveTo(point: Point): void {
    console.log(`Move view to ${point.toString()}`);
  }

  lineTo(point: Point): void {
    console.log(`Created line to ${point.toString()}`);
  }

  printText(leftTop: Point, size: number, text: string): void {
    console.log(
      `Text printed at ${leftTop.toString()}, size: ${size}, text: ${text}`,
    );
  }

  drawEllipse(
    centerPoint: Point,
    radiusWidth: number,
    radiusHeight: number,
  ): void {
    console.log(
      `Draw ellipse ${centerPoint.toString()}, radiusWidth: ${radiusWidth}, radiusHeight: ${radiusHeight}`,
    );
  }
}

describe("Picture", () => {
  const mockCanvas = new Canvas();

  let picture: Shapes.Picture = undefined;

  beforeEach(() => {
    picture = new Shapes.Picture(mockCanvas);
  });

  test("addShape should add a shape to the picture", () => {
    const shapeId = "c1";

    const mockDrawingRectangleStrategy = new RectangleDrawingStrategy({
      color: "#000000",
      controlPoints: [new Point(1, 1), new Point(10, 10)],
    });

    picture.addShape(shapeId, mockDrawingRectangleStrategy);

    expect(picture.list()).toBe(
      "1 c1 rectangle - color:#000000 - leftTop: (1, 1) - rightBottom: (10, 10)\n",
    );
  });

  test("addShape should throw an error for duplicate shape id", () => {
    const shapeId = "c1";
    const mockDrawingRectangleStrategy = new RectangleDrawingStrategy({
      color: "#000000",
      controlPoints: [new Point(1, 1), new Point(10, 10)],
    });

    picture.addShape(shapeId, mockDrawingRectangleStrategy);

    expect(() =>
      picture.addShape(shapeId, mockDrawingRectangleStrategy),
    ).toThrow("Shape with this id already exists");
  });

  test("delete should delete existing shape", () => {
    const shapeId = "c1";
    const mockDrawingRectangleStrategy = new RectangleDrawingStrategy({
      color: "#000000",
      controlPoints: [new Point(1, 1), new Point(10, 10)],
    });

    picture.addShape(shapeId, mockDrawingRectangleStrategy);
    picture.deleteShape(shapeId);

    expect(picture.list()).toBe("");
  });

  test("drawshape should draw shape in mock canvas", () => {
    const shapeId = "c1";
    const mockDrawingRectangleStrategy = new RectangleDrawingStrategy({
      color: "#000000",
      controlPoints: [new Point(1, 1), new Point(10, 10)],
    });

    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    picture.addShape(shapeId, mockDrawingRectangleStrategy);
    picture.drawShape(shapeId);

    expect(logSpy).toHaveBeenCalledWith("Move view to (1, 1)");
    expect(logSpy).toHaveBeenCalledWith("Created line to (10, 1)");
    expect(logSpy).toHaveBeenCalledWith("Created line to (10, 10)");
    expect(logSpy).toHaveBeenCalledWith("Created line to (1, 10)");
    expect(logSpy).toHaveBeenCalledWith("Created line to (1, 1)");
    expect(logSpy).toHaveBeenCalledWith("Setted color #000000");

    logSpy.mockRestore();
  });

  test("changeshape should change one shape into another", () => {
    const shapeId = "c1";
    const mockDrawingRectangleStrategy = new RectangleDrawingStrategy({
      color: "#000000",
      controlPoints: [new Point(1, 1), new Point(10, 10)],
    });
    const mockDrawingCircleStrategy = new CircleDrawingStrategy({
      color: "#000000",
      radius: 50,
      controlPoints: [new Point(1, 1)],
    });

    picture.addShape(shapeId, mockDrawingRectangleStrategy);
    picture.changeShape(shapeId, mockDrawingCircleStrategy);

    expect(picture.list()).toBe(
      "1 c1 circle - color:#000000 - center: (1, 1) - radius: 50\n",
    );
  });

  test("moveshape should move shape by (dx,dy)", () => {
    const shapeId = "c1";
    const mockDrawingCircleStrategy = new CircleDrawingStrategy({
      color: "#FFFFFF",
      radius: 50,
      controlPoints: [new Point(1, 1)],
    });
    picture.addShape(shapeId, mockDrawingCircleStrategy);
    picture.moveShape(shapeId, 100, 100);

    expect(picture.list()).toBe(
      "1 c1 circle - color:#FFFFFF - center: (101, 101) - radius: 50\n",
    );
  });

  test("changecolor should change shape's color from one to another", () => {
    const shapeId = "c1";
    const mockDrawingRectangleStrategy = new RectangleDrawingStrategy({
      color: "#000000",
      controlPoints: [new Point(1, 1), new Point(10, 10)],
    });
    const newColor = "#ffffff";

    picture.addShape(shapeId, mockDrawingRectangleStrategy);
    picture.changeColor(shapeId, newColor);

    expect(picture.list()).toBe(
      "1 c1 rectangle - color:#ffffff - leftTop: (1, 1) - rightBottom: (10, 10)\n",
    );
  });

  test("drawpicture should draw shapes in mock canvas", () => {
    const shapeRectangleId = "r1";
    const shapeCircleId = "c1";
    const mockDrawingRectangleStrategy = new RectangleDrawingStrategy({
      color: "#000000",
      controlPoints: [new Point(1, 1), new Point(10, 10)],
    });
    const mockDrawingCircleStrategy = new CircleDrawingStrategy({
      color: "#FFFFFF",
      radius: 50,
      controlPoints: [new Point(1, 1)],
    });

    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    picture.addShape(shapeRectangleId, mockDrawingRectangleStrategy);
    picture.addShape(shapeCircleId, mockDrawingCircleStrategy);
    picture.drawPicture();

    expect(logSpy).toHaveBeenCalledWith("Move view to (1, 1)");
    expect(logSpy).toHaveBeenCalledWith("Created line to (10, 1)");
    expect(logSpy).toHaveBeenCalledWith("Created line to (10, 10)");
    expect(logSpy).toHaveBeenCalledWith("Created line to (1, 10)");
    expect(logSpy).toHaveBeenCalledWith("Created line to (1, 1)");
    expect(logSpy).toHaveBeenCalledWith("Setted color #000000");
    expect(logSpy).toHaveBeenCalledWith(
      "Draw ellipse (1, 1), radiusWidth: 50, radiusHeight: 50",
    );
    expect(logSpy).toHaveBeenCalledWith("Setted color #FFFFFF");

    logSpy.mockRestore();
  });

  test("movepicture should move whole picture by (dx,dy)", () => {
    const shapeRectangleId = "r1";
    const shapeCircleId = "c1";
    const mockDrawingRectangleStrategy = new RectangleDrawingStrategy({
      color: "#000000",
      controlPoints: [new Point(1, 1), new Point(10, 10)],
    });
    const mockDrawingCircleStrategy = new CircleDrawingStrategy({
      color: "#FFFFFF",
      radius: 50,
      controlPoints: [new Point(1, 1)],
    });

    picture.addShape(shapeRectangleId, mockDrawingRectangleStrategy);
    picture.addShape(shapeCircleId, mockDrawingCircleStrategy);

    expect(picture.list()).toBe(
      "1 r1 rectangle - color:#000000 - leftTop: (1, 1) - rightBottom: (10, 10)\n" +
        "2 c1 circle - color:#FFFFFF - center: (1, 1) - radius: 50\n",
    );

    picture.movePicture(1000, 1000);

    expect(picture.list()).toBe(
      "1 r1 rectangle - color:#000000 - leftTop: (1001, 1001) - rightBottom: (1010, 1010)\n" +
        "2 c1 circle - color:#FFFFFF - center: (1001, 1001) - radius: 50\n",
    );
  });
});

describe("Shape", () => {
  const mockCanvas = new Canvas();

  let shape: Shapes.Shape = undefined;

  const defaultColor = "#000000";

  const mockDrawingCircleStrategy = new CircleDrawingStrategy({
    color: defaultColor,
    radius: 50,
    controlPoints: [new Point(1, 1)],
  });

  beforeEach(() => {
    shape = new Shapes.Shape(mockDrawingCircleStrategy);
  });

  test("getColor should give the current color of shape", () => {
    expect(shape.getColor()).toBe(defaultColor);
  });

  test("setColor should replace old color of shape with new one", () => {
    const newColor = "#f0f1f2";
    shape.setColor(newColor);

    expect(shape.getColor()).toBe(newColor);
  });

  test("getDrawingStrategyInfo should get the current drawing strategy in string format", () => {
    expect(shape.getDrawingStrategyInfo()).toBe(
      "circle - color:#f0f1f2 - center: (1, 1) - radius: 50",
    );
  });

  test("setDrawingStrategy", () => {
    const newDrawingStrategy = new LineDrawingStrategy({
      color: "#414141",
      controlPoints: [new Point(0, 0), new Point(10, 10)],
    });

    shape.setDrawingStrategy(newDrawingStrategy);

    expect(shape.getDrawingStrategyInfo()).toBe(
      "line - color:#414141 - from: (0, 0) - to: (10, 10)",
    );
  });

  test("getControlPoints must give the current control points of shape", () => {
    const newDrawingStrategy = new LineDrawingStrategy({
      color: "#414141",
      controlPoints: [new Point(0, 0), new Point(10, 10)],
    });

    shape.setDrawingStrategy(newDrawingStrategy);

    expect(shape.getControlPoints().toString()).toBe("(0, 0),(10, 10)");
  });

  test("draw must draw shape in canvas", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    shape.draw(mockCanvas);

    expect(logSpy).toHaveBeenCalledWith(
      "Draw ellipse (1, 1), radiusWidth: 50, radiusHeight: 50",
    );
    expect(logSpy).toHaveBeenCalledWith("Setted color #f0f1f2");

    logSpy.mockRestore();
  });
});
