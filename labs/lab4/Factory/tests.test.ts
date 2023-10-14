import PictureDraft from "./PictureDraft/PictureDraft";
import Point from "./Point/Point";
import ShapeFactory from "./ShapeFactory/ShapeFactory";
import Ellipse from "./Shapes/Ellipse/Ellipse";
import Rectangle from "./Shapes/Rectangle/Rectangle";
import Triangle from "./Shapes/Triangle/Triangle";
import { Color } from "./common/Color";

describe("Testing Shapes creation", () => {
  test("Creating Rectangle", () => {
    const leftTop = new Point(3, 3);
    const rightBottom = new Point(10, 10);
    const color = Color.GREEN;

    const rectangle = new Rectangle(leftTop, rightBottom, color);

    expect(rectangle.getColor()).toBe(color);
    expect(rectangle.getRightBottom()).toEqual(rightBottom);
    expect(rectangle.getLeftTop()).toEqual(leftTop);
  });

  test("Creating Triangle", () => {
    const vertex1 = new Point(3, 3);
    const vertex2 = new Point(30, 30);
    const vertex3 = new Point(60, 10);
    const color = Color.GREEN;

    const triangle = new Triangle(vertex1, vertex2, vertex3, color);

    expect(triangle.getColor()).toBe(color);
    expect(triangle.getFirstVertex()).toEqual(vertex1);
    expect(triangle.getSecondVertex()).toEqual(vertex2);
    expect(triangle.getThirdVertex()).toEqual(vertex3);
  });

  test("Creating Valid Ellipse", () => {
    const center = new Point(3, 3);
    const widthRadius = 200;
    const heightRadius = 400;
    const color = Color.GREEN;

    const ellipse = new Ellipse(center, widthRadius, heightRadius, color);

    expect(ellipse.getColor()).toBe(color);
    expect(ellipse.getCenter()).toEqual(center);
    expect(ellipse.getWidthRadius()).toBe(widthRadius);
    expect(ellipse.getHeightRadius()).toBe(heightRadius);
  });
});

describe("Testing CPictureDraft", () => {
  describe("Creating CPictureDraft", () => {
    test("An empty draft is created", () => {
      const pictureDraft = new PictureDraft();
      expect(pictureDraft.getShapesSize()).toBe(0);
    });
  });

  describe("Fill in the draft with figures", () => {
    test("Figures have been added", () => {
      const pictureDraft = new PictureDraft();

      const rectangle = new Rectangle(
        new Point(10, 10),
        new Point(100, 100),
        Color.GREEN,
      );
      const triangle = new Triangle(
        new Point(5, 5),
        new Point(15, 5),
        new Point(10, 10),
        Color.BLUE,
      );
      const ellipse = new Ellipse(new Point(20, 20), 8, 5, Color.PINK);

      pictureDraft.addShape(rectangle);
      pictureDraft.addShape(triangle);
      pictureDraft.addShape(ellipse);

      expect(pictureDraft.getShapesSize()).toBe(3);

      const shape = pictureDraft.getShape(2);
      expect(shape).toEqual(ellipse);
    });
  });
});

describe("Testing creating shapes by factory", () => {
  const shapeFactory = new ShapeFactory();

  describe("Invalid command", () => {
    test("Exception is thrown", () => {
      expect(() => shapeFactory.createShape("")).toThrowError(
        "Args can not be empty",
      );
      expect(() => shapeFactory.createShape("triangle 100, 100")).toThrowError(
        "Incorrect args count",
      );
      expect(() => shapeFactory.createShape("rectangle")).toThrowError(
        "Incorrect args count",
      );
    });
  });

  describe("Creating a Rectangle", () => {
    test("Created Rectangle", () => {
      const shape = shapeFactory.createShape("rectangle 50 50 350 300 black");
      expect(shape).toBeInstanceOf(Rectangle);

      const rectangle = shape as Rectangle;
      expect(rectangle.getLeftTop()).toEqual(new Point(50, 50));
      expect(rectangle.getRightBottom()).toEqual(new Point(350, 300));
      expect(rectangle.getColor()).toBe(Color.BLACK);
    });
  });

  describe("Creating a Triangle", () => {
    test("Created Triangle", () => {
      const shape = shapeFactory.createShape(
        "triangle 0 0 30 30 150 200 yellow",
      );
      expect(shape).toBeInstanceOf(Triangle);

      const triangle = shape as Triangle;
      expect(triangle.getFirstVertex()).toEqual(new Point(0, 0));
      expect(triangle.getSecondVertex()).toEqual(new Point(30, 30));
      expect(triangle.getThirdVertex()).toEqual(new Point(150, 200));
      expect(triangle.getColor()).toBe(Color.YELLOW);
    });
  });

  describe("Creating an Ellipse", () => {
    test("Created Ellipse", () => {
      const shape = shapeFactory.createShape("ellipse 400 300 100 50 pink");
      expect(shape).toBeInstanceOf(Ellipse);

      const ellipse = shape as Ellipse;
      expect(ellipse.getCenter()).toEqual(new Point(400, 300));
      expect(ellipse.getWidthRadius()).toBe(100);
      expect(ellipse.getHeightRadius()).toBe(50);
      expect(ellipse.getColor()).toBe(Color.PINK);
    });
  });
});
