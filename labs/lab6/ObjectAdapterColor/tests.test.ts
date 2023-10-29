/* eslint-disable @typescript-eslint/no-unused-vars */
import { app } from "./App/App";
import { ModernGraphicsLib } from "./ModernGraphicsLib/ModernGraphicsLib";

const mockDrawLine = jest.fn(
  (
    start: ModernGraphicsLib.Point,
    end: ModernGraphicsLib.Point,
    color: ModernGraphicsLib.RGBAColor,
  ) => {},
);

class MockModernGraphicsRenderer
  implements ModernGraphicsLib.IModernGraphicsRenderer
{
  constructor() {}

  public beginDraw(): void {}
  public drawLine(
    start: ModernGraphicsLib.Point,
    end: ModernGraphicsLib.Point,
    rgbaColor: ModernGraphicsLib.RGBAColor,
  ): void {
    mockDrawLine(start, end, rgbaColor);
  }
  public endDraw(): void {}
}

describe("test object adapter", () => {
  beforeEach(() => {
    mockDrawLine.mockClear();
  });

  test("moveTo call should move currentPoint to moveTo parameters", () => {
    const renderer: ModernGraphicsLib.IModernGraphicsRenderer =
      new MockModernGraphicsRenderer();
    const adapter: app.ModernGraphicsRendererAdapter =
      new app.ModernGraphicsRendererAdapter(renderer);

    adapter.moveTo(10, 20);
    adapter.lineTo(30, 40);

    expect(mockDrawLine).toBeCalledTimes(1);
    expect(mockDrawLine.mock.calls[0][0]?.x).toBe(10);
    expect(mockDrawLine.mock.calls[0][0]?.y).toBe(20);
    expect(mockDrawLine.mock.calls[0]).toEqual([
      { x: 10, y: 20 },
      { x: 30, y: 40 },
      { a: 0, b: 0, g: 0, r: 0 },
    ]);
  });
});
