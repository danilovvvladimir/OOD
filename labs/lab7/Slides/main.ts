import { CCanvas } from "./Canvas/Canvas";
import ICanvas from "./Canvas/ICanvas";
import Frame from "./Common/Frame";
import Point from "./Common/Point";
import RGBAColor from "./Common/RGBAColor";
import FillStyle from "./Common/Styles/FillStyle";
import LineStyle from "./Common/Styles/LineStyle";
import IShapeGroup from "./ShapeGroup/IShapeGroup";
import ShapeGroup from "./ShapeGroup/ShapeGroup";
import Ellipse from "./Shapes/Ellipse";
import IShape from "./Shapes/IShape";
import Rectangle from "./Shapes/Rectangle";
import Triangle from "./Shapes/Triangle";
import ISlide from "./Slide/ISlide";
import Slide from "./Slide/Slide";

const slide: ISlide = new Slide();
const canvas: ICanvas = new CCanvas(1000, 1000);

const ellipse1 = new Ellipse(
  new Frame(100, 100, 100, 100),
  new LineStyle(new RGBAColor(144, 69, 205, 1), 3),
  new FillStyle(new RGBAColor(0, 0, 0, 0.5), true),
  new Point(100, 100),
  30,
  30,
);

const ellipse2 = new Ellipse(
  new Frame(100, 100, 100, 100),
  new LineStyle(new RGBAColor(69, 69, 205, 1), 3),
  new FillStyle(new RGBAColor(0, 0, 0, 0.5), true),
  new Point(200, 200),
  30,
  30,
);

const ellipses = new ShapeGroup(new Frame(100, 100, 200, 200));

ellipses.insertShape(ellipse1, 0);
ellipses.insertShape(ellipse2, 1);

// Разный LineStyle = undefined
// Same FillStyle = 0 0 0 0.5
console.log("Shapes in ellipses group:", ellipses.getShapesCount());

console.log("Shapesgroup fill style #1:", ellipses.getFillStyle()?.getColor());
console.log("Shapesgroup line style #1:", ellipses.getLineStyle()?.getColor());

ellipses.setFrame(new Frame(100, 100, 400, 400));
ellipses.setFillStyle(new FillStyle(new RGBAColor(69, 140, 245, 1), true));
ellipses.setLineStyle(new LineStyle(new RGBAColor(69, 140, 245, 1)));

console.log("*Fill styles changed*");
console.log("Shapesgroup fill style #2:", ellipses.getFillStyle()?.getColor());
console.log("Shapesgroup line style #2:", ellipses.getLineStyle()?.getColor());

ellipses
  .getShapeAtIndex(0)
  .setFillStyle(new FillStyle(new RGBAColor(140, 140, 140, 1), true));

const rectangle = new Rectangle(
  new Frame(250, 100, 500, 30),
  new LineStyle(new RGBAColor(0, 0, 0, 1), 3),
  new FillStyle(new RGBAColor(50, 110, 240, 1), true),
  new Point(250, 100),
  500,
  30,
);

const triangle = new Triangle(
  new Frame(400, 250, 200, 100),
  new LineStyle(new RGBAColor(255, 255, 120, 1), 3),
  new FillStyle(new RGBAColor(140, 255, 70, 1), true),
  [new Point(400, 250), new Point(600, 250), new Point(500, 150)],
);

// slide.addShape(ellipses);
// slide.addShape(rectangle);
// slide.addShape(triangle);

const allShapes = new ShapeGroup(new Frame(100, 100, 600, 600));

allShapes.insertShape(ellipses, 0);
allShapes.insertShape(rectangle, 1);
allShapes.insertShape(triangle, 2);

allShapes.setFrame(new Frame(100, 100, 800, 800));
allShapes.setFillStyle(new FillStyle(new RGBAColor(140, 69, 205, 1), true));

allShapes
  .getShapeAtIndex(0)
  .getGroup()
  .getShapeAtIndex(0)
  .setFillStyle(new FillStyle(new RGBAColor(50, 110, 240, 1), true));

slide.addShape(allShapes);

slide.draw(canvas);

canvas
  .saveToPng("image.png")
  .then(() => {
    console.log("Image successfully created");
  })
  .catch((e) => {
    console.log(String(e));
  });
