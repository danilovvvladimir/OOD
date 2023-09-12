// import { ICanvas } from "../canvas/canvas";
// import {
//   CircleDetails,
//   LineDetails,
//   RectangleDetails,
//   ShapeDetails,
//   TextDetails,
//   TriangleDetails,
// } from "../details/details";

// import { Point } from "../point/point";

// export interface IDrawingStrategy {
//   details: ShapeDetails;
//   draw(canvas: ICanvas): void;
// }

// export class RectangleDrawingStrategy implements IDrawingStrategy {
//   details: RectangleDetails;

//   constructor(details: RectangleDetails) {
//     this.details = details;
//   }

//   draw(canvas: ICanvas): void {
//     const { color, height, leftTop, width } = this.details;
//     const rightBottom = new Point(
//       leftTop.getX() + width,
//       leftTop.getY() - height,
//     );
//     canvas.moveTo(leftTop);
//     canvas.lineTo(new Point(rightBottom.getX(), leftTop.getY()));
//     canvas.lineTo(new Point(rightBottom.getX(), rightBottom.getY()));
//     canvas.lineTo(new Point(leftTop.getX(), rightBottom.getY()));
//     canvas.lineTo(leftTop);
//     canvas.setColor(color);
//   }
// }

// export class CircleDrawingStrategy implements IDrawingStrategy {
//   details: CircleDetails;

//   constructor(details: CircleDetails) {
//     this.details = details;
//   }

//   draw(canvas: ICanvas): void {
//     const { color, center, radius } = this.details;

//     canvas.moveTo(center);
//     canvas.drawEllipse(center, radius, radius);
//     canvas.setColor(color);
//   }
// }

// export class LineDrawingStrategy implements IDrawingStrategy {
//   details: LineDetails;

//   constructor(details: LineDetails) {
//     this.details = details;
//   }

//   draw(canvas: ICanvas): void {
//     const { color, from, to } = this.details;

//     canvas.moveTo(from);
//     canvas.lineTo(to);
//     canvas.setColor(color);
//   }
// }

// export class TriangleDrawingStrategy implements IDrawingStrategy {
//   details: TriangleDetails;

//   constructor(details: TriangleDetails) {
//     this.details = details;
//   }

//   draw(canvas: ICanvas): void {
//     const { color, firstVertex, secondVertex, thirdVertex } = this.details;

//     canvas.moveTo(firstVertex);
//     canvas.lineTo(secondVertex);
//     canvas.lineTo(thirdVertex);
//     canvas.lineTo(firstVertex);
//     canvas.setColor(color);
//   }
// }

// export class TextDrawingStrategy implements IDrawingStrategy {
//   details: TextDetails;

//   constructor(details: TextDetails) {
//     this.details = details;
//   }

//   draw(canvas: ICanvas): void {
//     const { color, fontSize, leftTop, text } = this.details;

//     canvas.moveTo(leftTop);
//     canvas.printText(leftTop, fontSize, text);
//     canvas.setColor(color);
//   }
// }
