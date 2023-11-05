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

const leftEye: IShape = new Ellipse(
  new Frame(70, 70, 30, 30),
  new LineStyle(new RGBAColor(255, 255, 0, 1), 3),
  new FillStyle(new RGBAColor(0, 0, 0, 0), false),
  new Point(100, 100),
  30,
  30,
);
const rightEye: IShape = new Ellipse(
  new Frame(870, 70, 30, 30),
  new LineStyle(new RGBAColor(255, 255, 0, 1), 3),
  new FillStyle(new RGBAColor(0, 0, 0, 0), false),
  new Point(900, 100),
  30,
  30,
);
const eyes: IShapeGroup = new ShapeGroup(new Frame(70, 70, 860, 30));
eyes.insertShape(leftEye, 0);
eyes.insertShape(rightEye, 1);
eyes.insertShape(eyes, 2);
const eyebrow: IShape = new Rectangle(
  new Frame(250, 100, 500, 30),
  new LineStyle(new RGBAColor(0, 0, 0, 1), 3),
  new FillStyle(new RGBAColor(0, 0, 0, 0), false),
  new Point(250, 100),
  500,
  30,
);
const nostrils: IShape = new Triangle(
  new Frame(400, 250, 200, 100),
  new LineStyle(new RGBAColor(255, 255, 0, 1), 3),
  new FillStyle(new RGBAColor(255, 255, 0, 0), false),
  [new Point(400, 250), new Point(600, 250), new Point(500, 350)],
);
const mouth: IShape = new Ellipse(
  new Frame(200, 450, 300, 50),
  new LineStyle(new RGBAColor(255, 0, 0, 1), 3),
  new FillStyle(new RGBAColor(255, 255, 0, 0), false),
  new Point(500, 500),
  300,
  50,
);

// Примеры изменения состояний фигур относительно координатной сетки
mouth.setFrame(new Frame(200, 450, 100, 100));
// nostrils.setFrame(new Frame(500, 150, 400, 200));
// eyebrow.setFrame(new Frame(50, 100, 700, 30));
// eyes.setFrame(new Frame(0, 0, 860, 30));
// Мариец
eyes.setFrame(new Frame(70, 70, 860, 5));

slide.addShape(eyes);
slide.addShape(nostrils);
slide.addShape(mouth);

const style = eyes.getLineStyle();
console.log(style.getColor()?.toString());
eyes.insertShape(eyebrow, 3);
console.log(style.getColor()?.toString());
console.log(eyes.getLineStyle().getColor()?.toString());

slide.draw(canvas);

canvas
  .saveToPng("image.png")
  .then(() => {
    console.log("Successfully executed");
  })
  .catch((e) => {
    console.log(String(e));
  });
