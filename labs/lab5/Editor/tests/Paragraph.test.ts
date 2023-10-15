import IParagraph from "../Paragraph/IParagraph";
import Paragraph from "../Paragraph/Paragraph";

describe("Testing Paragraph", () => {
  test("Empty paragraph contains empty text", () => {
    const paragraph: IParagraph = new Paragraph();

    expect(paragraph.getText()).toBe("");
  });

  test("Paragraph with empty string contains empty string", () => {
    const paragraph: IParagraph = new Paragraph("");

    expect(paragraph.getText()).toBe("");
  });

  test("Paragraph is able to containing arbitrary text", () => {
    const paragraph: IParagraph = new Paragraph("Lorema lorem");

    expect(paragraph.getText()).toBe("Lorema lorem");
  });
});
