export namespace GraphicsLib {
  export interface ICanvas {
    setColor(rgbColor: number): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
  }

  export class CCanvas implements ICanvas {
    public moveTo(x: number, y: number): void {
      console.log("Move to (" + x + ", " + y + ")");
    }

    public lineTo(x: number, y: number): void {
      console.log("Line to (" + x + ", " + y + ")");
    }

    public setColor(rgbColor: number): void {
      console.log(`SetColor (#${rgbColor.toString(16).padStart(6, "0")})`);
    }
  }
}
