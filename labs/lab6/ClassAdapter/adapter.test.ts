import { app } from "./App/App";

describe("test class adapter", () => {
  const log = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = log;
  });

  test("moveTo call should move currentPoint to moveTo parameters", () => {
    const adapter: app.ModernGraphicsRendererAdapter =
      new app.ModernGraphicsRendererAdapter();

    adapter.moveTo(10, 20);

    adapter.lineTo(30, 40);
    expect(console.log).toBeCalledTimes(3);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe("<draw>");
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "  <line fromX=10 fromY=20 toX=30 toY=40 />",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe("</draw>");
  });

  test("moveTo call with negative arguments should be successfully executed", () => {
    const adapter: app.ModernGraphicsRendererAdapter =
      new app.ModernGraphicsRendererAdapter();

    adapter.moveTo(-10, -20);

    adapter.lineTo(30, 40);
    expect(console.log).toBeCalledTimes(3);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe("<draw>");
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "  <line fromX=-10 fromY=-20 toX=30 toY=40 />",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe("</draw>");
  });

  test("moveTo call with the same arguments should be successfully executed", () => {
    const adapter: app.ModernGraphicsRendererAdapter =
      new app.ModernGraphicsRendererAdapter();

    adapter.moveTo(0, 0);

    adapter.lineTo(30, 40);
    expect(console.log).toBeCalledTimes(3);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe("<draw>");
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "  <line fromX=0 fromY=0 toX=30 toY=40 />",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe("</draw>");
  });

  test("lineTo call should invoke drawLine with right arguments", () => {
    const adapter: app.ModernGraphicsRendererAdapter =
      new app.ModernGraphicsRendererAdapter();

    adapter.moveTo(10, 20);
    adapter.lineTo(30, 40);

    expect(console.log).toBeCalledTimes(3);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe("<draw>");
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "  <line fromX=10 fromY=20 toX=30 toY=40 />",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe("</draw>");
  });

  test("lineTo call should change currentPoint", () => {
    const adapter: app.ModernGraphicsRendererAdapter =
      new app.ModernGraphicsRendererAdapter();

    adapter.moveTo(10, 20);
    adapter.lineTo(30, 40);
    adapter.lineTo(50, 60);

    expect(console.log).toBeCalledTimes(6);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe("<draw>");
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "  <line fromX=10 fromY=20 toX=30 toY=40 />",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe("</draw>");
    expect((console.log as jest.Mock).mock.calls[3][0]).toBe("<draw>");
    expect((console.log as jest.Mock).mock.calls[4][0]).toBe(
      "  <line fromX=30 fromY=40 toX=50 toY=60 />",
    );
    expect((console.log as jest.Mock).mock.calls[5][0]).toBe("</draw>");
  });

  test("lineTo call with negative arguments should be successfuly executed", () => {
    const adapter: app.ModernGraphicsRendererAdapter =
      new app.ModernGraphicsRendererAdapter();

    adapter.moveTo(10, 20);
    adapter.lineTo(-30, -40);

    expect(console.log).toBeCalledTimes(3);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe("<draw>");
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "  <line fromX=10 fromY=20 toX=-30 toY=-40 />",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe("</draw>");
  });

  test("lineTo call with the same arguments should be successfuly executed", () => {
    const adapter: app.ModernGraphicsRendererAdapter =
      new app.ModernGraphicsRendererAdapter();

    adapter.moveTo(10, 20);
    adapter.lineTo(0, 0);

    expect(console.log).toBeCalledTimes(3);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe("<draw>");
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "  <line fromX=10 fromY=20 toX=0 toY=0 />",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe("</draw>");
  });
});
