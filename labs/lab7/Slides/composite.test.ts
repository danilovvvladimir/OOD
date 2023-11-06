import Frame from "./Common/Frame";
import Point from "./Common/Point";
import RGBAColor from "./Common/RGBAColor";
import FillStyle from "./Common/Styles/FillStyle";
import LineStyle from "./Common/Styles/LineStyle";
import IShapeGroup from "./ShapeGroup/IShapeGroup";
import ShapeGroup from "./ShapeGroup/ShapeGroup";
import Ellipse from "./Shapes/Ellipse";
import Triangle from "./Shapes/Triangle";

describe("Testing Composite class cases", () => {
  let ellipse1: Ellipse;
  let ellipse2: Ellipse;
  let shapeGroup: IShapeGroup;

  beforeEach(() => {
    ellipse1 = new Ellipse(
      new Frame(100, 100, 100, 100),
      new LineStyle(new RGBAColor(144, 69, 205, 1), 3),
      new FillStyle(new RGBAColor(0, 0, 0, 0.5), true),
      new Point(100, 100),
      30,
      30,
    );

    ellipse2 = new Ellipse(
      new Frame(100, 100, 100, 100),
      new LineStyle(new RGBAColor(69, 69, 205, 1), 3),
      new FillStyle(new RGBAColor(0, 0, 0, 0.5), true),
      new Point(200, 200),
      30,
      30,
    );

    shapeGroup = new ShapeGroup(new Frame(100, 150, 200, 300));
    shapeGroup.insertShape(ellipse1, 0);
    shapeGroup.insertShape(ellipse2, 1);
  });

  test("Testing getShapesCount, should give amount of shapes in group", () => {
    const shapeCount = shapeGroup.getShapesCount();

    expect(shapeCount).toBe(2);
  });

  test("Testing insertShape, should add new shape to group", () => {
    const shapeCount = shapeGroup.getShapesCount();

    const triangle = new Triangle(
      new Frame(250, 250, 300, 300),
      new LineStyle(new RGBAColor(69, 69, 205, 1), 3),
      new FillStyle(new RGBAColor(0, 0, 0, 0.5), true),
      [new Point(350, 350), new Point(400, 400), new Point(350, 400)],
    );

    shapeGroup.insertShape(triangle, 2);

    expect(shapeGroup.getShapesCount()).toBe(shapeCount + 1);
    expect(shapeGroup.getShapeAtIndex(2)).toBe(triangle);
  });

  test("Testing getShapeAtIndex with valid index", () => {
    const ellipse = shapeGroup.getShapeAtIndex(0);

    expect(ellipse).toBe(ellipse1);
  });

  test("Testing getShapeAtIndex with invalid index", () => {
    expect(() => shapeGroup.getShapeAtIndex(2)).toThrowError("Incorrect index");
  });

  test("Testing removeShapeAtIndex with valid index", () => {
    const shapeCountBeforeRemoving = shapeGroup.getShapesCount();
    shapeGroup.removeShapeAtIndex(0);

    expect(shapeGroup.getShapesCount()).toBe(shapeCountBeforeRemoving - 1);
  });

  test("Testing getFrame", () => {
    const groupFrame = shapeGroup.getFrame();

    expect(groupFrame.x).toBe(100);
    expect(groupFrame.y).toBe(150);
    expect(groupFrame.width).toBe(200);
    expect(groupFrame.height).toBe(300);
  });

  test("Testing getFillStyle, should be equal to concrete value because of same initial fill color", () => {
    expect(shapeGroup.getFillStyle().getColor()).toEqual({
      r: 0,
      g: 0,
      b: 0,
      a: 0.5,
    });
  });

  test("Testing getLineStyle, should be equal undefined because of different initial line color", () => {
    console.log(shapeGroup.getLineStyle().getColor());

    expect(shapeGroup.getLineStyle().getColor()).toEqual(undefined);
  });

  test("Testing setFillStyle, should change fill style of every shape in group", () => {
    shapeGroup.setFillStyle(new FillStyle(new RGBAColor(100, 200, 150, 1)));

    expect(shapeGroup.getFillStyle().getColor()).toEqual({
      r: 100,
      g: 200,
      b: 150,
      a: 1,
    });

    expect(shapeGroup.getShapeAtIndex(0).getFillStyle().getColor()).toEqual({
      r: 100,
      g: 200,
      b: 150,
      a: 1,
    });

    expect(shapeGroup.getShapeAtIndex(1).getFillStyle().getColor()).toEqual({
      r: 100,
      g: 200,
      b: 150,
      a: 1,
    });
  });

  test("Testing getLineStyle, should be equal undefined because of different initial line color", () => {
    console.log(shapeGroup.getLineStyle().getColor());

    expect(shapeGroup.getLineStyle().getColor()).toEqual(undefined);
  });

  test("Testing setFrame, every shape should expand in 2 times", () => {
    const frameBeforeExpanding = shapeGroup.getFrame();
    const randomShapeBeforeExpanding = shapeGroup.getShapeAtIndex(0);
    const randomShapeFrameWidth = randomShapeBeforeExpanding.getFrame().width;
    const randomShapeFrameHeight = randomShapeBeforeExpanding.getFrame().height;

    shapeGroup.setFrame(new Frame(100, 150, 400, 600));
    const frameAfterExpanding = shapeGroup.getFrame();
    const sameRandomShapeAfterExpanding = shapeGroup.getShapeAtIndex(0);

    console.log(shapeGroup.getShapeAtIndex(0));
    expect(frameAfterExpanding.height).toBe(frameBeforeExpanding.height * 2);
    expect(frameAfterExpanding.width).toBe(frameBeforeExpanding.width * 2);

    expect(sameRandomShapeAfterExpanding.getFrame().width).toBe(
      randomShapeFrameWidth * 2,
    );
    expect(sameRandomShapeAfterExpanding.getFrame().height).toBe(
      randomShapeFrameHeight * 2,
    );
  });
});
