import { GraphicsLib } from "../GraphicsLib/Graphlib";
import { ModernGraphicsLib } from "../ModernGraphicsLib/ModernGraphicsLib";
import { ShapeDrawingLib } from "../ShapeDrawingLib/ShapeDrawingLib";

export namespace app {
  export class ModernGraphicsRendererAdapter
    extends ModernGraphicsLib.ModernGraphicsRenderer
    implements GraphicsLib.ICanvas
  {
    private currentPoint: ModernGraphicsLib.Point = new ModernGraphicsLib.Point(
      0,
      0,
    );

    constructor() {
      super();
    }
    // begin draw вызывать один раз и end draw
    public moveTo(x: number, y: number): void {
      this.currentPoint = new ModernGraphicsLib.Point(x, y);
    }

    public lineTo(x: number, y: number): void {
      const toPoint: ModernGraphicsLib.Point = new ModernGraphicsLib.Point(
        x,
        y,
      );

      this.beginDraw();
      this.drawLine(this.currentPoint, toPoint);
      this.endDraw();

      this.currentPoint = toPoint;
    }
  }

  const paintPicture = (painter: ShapeDrawingLib.CanvasPainter): void => {
    const triangle: ShapeDrawingLib.ICanvasDrawable =
      new ShapeDrawingLib.CTriangle(
        new ShapeDrawingLib.Point(10, 15),
        new ShapeDrawingLib.Point(100, 200),
        new ShapeDrawingLib.Point(150, 250),
      );

    const rectangle: ShapeDrawingLib.ICanvasDrawable =
      new ShapeDrawingLib.CRectangle(new ShapeDrawingLib.Point(30, 40), 18, 24);

    painter.draw(triangle);
    painter.draw(rectangle);
  };

  export const paintPictureOnCanvas = (): void => {
    const simpleCanvas: GraphicsLib.ICanvas = new GraphicsLib.CCanvas();
    const painter: ShapeDrawingLib.CanvasPainter =
      new ShapeDrawingLib.CanvasPainter(simpleCanvas);

    paintPicture(painter);
  };

  export const paintPictureOnModernGraphicsRenderer = (): void => {
    const adapter: ModernGraphicsRendererAdapter =
      new ModernGraphicsRendererAdapter();

    const painter: ShapeDrawingLib.CanvasPainter =
      new ShapeDrawingLib.CanvasPainter(adapter);

    paintPicture(painter);
  };
}
