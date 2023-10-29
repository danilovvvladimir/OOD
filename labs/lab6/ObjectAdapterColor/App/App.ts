import { GraphicsLib } from "../GraphicsLib/Graphlib";
import { ModernGraphicsLib } from "../ModernGraphicsLib/ModernGraphicsLib";
import { ShapeDrawingLib } from "../ShapeDrawingLib/ShapeDrawingLib";

export namespace app {
  export class ModernGraphicsRendererAdapter implements GraphicsLib.ICanvas {
    private currentPoint: ModernGraphicsLib.Point = new ModernGraphicsLib.Point(
      0,
      0,
    );
    private modernGraphicsRenderer: ModernGraphicsLib.IModernGraphicsRenderer;
    private RGBAColor: ModernGraphicsLib.RGBAColor =
      new ModernGraphicsLib.RGBAColor(0, 0, 0, 0);

    constructor(renderer: ModernGraphicsLib.IModernGraphicsRenderer) {
      this.modernGraphicsRenderer = renderer;
    }

    public moveTo(x: number, y: number): void {
      this.currentPoint = new ModernGraphicsLib.Point(x, y);
    }

    public lineTo(x: number, y: number): void {
      const toPoint: ModernGraphicsLib.Point = new ModernGraphicsLib.Point(
        x,
        y,
      );

      this.modernGraphicsRenderer.beginDraw();
      this.modernGraphicsRenderer.drawLine(
        this.currentPoint,
        toPoint,
        this.RGBAColor,
      );
      this.modernGraphicsRenderer.endDraw();

      this.currentPoint = toPoint;
    }

    public setColor(rgbColor: number) {
      const red = (rgbColor & 0xff) / 255;
      const green = ((rgbColor >> 8) & 0xff) / 255;
      const blue = ((rgbColor >> 16) & 0xff) / 255;
      this.RGBAColor = new ModernGraphicsLib.RGBAColor(red, green, blue, 1);
    }
  }

  const paintPicture = (painter: ShapeDrawingLib.CanvasPainter): void => {
    const triangle: ShapeDrawingLib.ICanvasDrawable =
      new ShapeDrawingLib.CTriangle(
        new ShapeDrawingLib.Point(10, 15),
        new ShapeDrawingLib.Point(100, 200),
        new ShapeDrawingLib.Point(150, 250),
        0x43ff64,
      );

    const rectangle: ShapeDrawingLib.ICanvasDrawable =
      new ShapeDrawingLib.CRectangle(
        new ShapeDrawingLib.Point(30, 40),
        18,
        24,
        0x00ff00,
      );

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
    const renderer: ModernGraphicsLib.IModernGraphicsRenderer =
      new ModernGraphicsLib.ModernGraphicsRenderer();

    const adapter: ModernGraphicsRendererAdapter =
      new ModernGraphicsRendererAdapter(renderer);

    const painter: ShapeDrawingLib.CanvasPainter =
      new ShapeDrawingLib.CanvasPainter(adapter);

    paintPicture(painter);
  };
}
