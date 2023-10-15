import HTMLLayoutCreator from "../HTMLLayoutCreator/HTMLLayoutCreator";

describe("Testing HTMLLayoutCreator", () => {
  test("Add paragraph should add paragraph correctly", () => {
    const htmlLayoutCreator: HTMLLayoutCreator = new HTMLLayoutCreator();

    htmlLayoutCreator.addParagraph("paragraph text");

    expect(htmlLayoutCreator.createHTMLLayout()).toContain(
      "<div>paragraph text</div>",
    );
  });

  test("Add image should add image correctly", () => {
    const htmlLayoutCreator: HTMLLayoutCreator = new HTMLLayoutCreator();

    htmlLayoutCreator.addImage("document.html", 200, 300);

    expect(htmlLayoutCreator.createHTMLLayout()).toContain(
      '<img src="document.html" width="200" height="300" />',
    );
  });
});
