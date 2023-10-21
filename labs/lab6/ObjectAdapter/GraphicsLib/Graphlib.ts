export namespace GraphicsLib {
  export interface ICanvas {
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
  }

  export class CCanvas implements ICanvas {
    // constructor() {}

    public moveTo(x: number, y: number): void {
      console.log("Move to (" + x + ", " + y + ")");
    }

    public lineTo(x: number, y: number): void {
      console.log("Line to (" + x + ", " + y + ")");
    }
  }
}
