import IImage from "../Image/IImage";
import Image from "../Image/Image";

describe("Testing image", () => {
  test("Arbitrary image creation creates right image", () => {
    const image: IImage = new Image("document.html", 200, 300);

    expect(image.getPath()).toBe("document.html");
    expect(image.getWidth()).toBe(200);
    expect(image.getHeight()).toBe(300);
  });

  test("Image creation with negative size should throw error", () => {
    expect(() => new Image("document.html", -200, 300)).toThrowError(
      "Width and height can not be negative",
    );
  });

  test("Image can be created with 0 width or 0 height", () => {
    const image: IImage = new Image("document.html", 0, 0);

    expect(image.getPath()).toBe("document.html");
    expect(image.getWidth()).toBe(0);
    expect(image.getHeight()).toBe(0);
  });
});
