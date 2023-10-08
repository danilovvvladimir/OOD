import Canvas from "./Canvas/Canvas";
import Designer from "./Designer/Designer";
import Painter from "./Painter/Painter";
import ShapeFactory from "./ShapeFactory/ShapeFactory";

const shapeFactory = new ShapeFactory();
const designer = new Designer(shapeFactory);
const pictureDraft = designer.createDraft();

const canvas = new Canvas(500, 500);

Painter.drawPicture(pictureDraft, canvas);
