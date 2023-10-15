import DocumentItem from "../DocumentItem/DocumentItem";
import IImage from "../Image/IImage";
import Image from "../Image/Image";
import IParagraph from "../Paragraph/IParagraph";
import Paragraph from "../Paragraph/Paragraph";

describe("Testing document item", () => {
  test("empty document item should be empty", () => {
    const documentItem: DocumentItem = new DocumentItem();

    expect(documentItem.getImage()).toBeUndefined();
    expect(documentItem.getParagraph()).toBeUndefined();
  });

  test("document item with image should contain only image", () => {
    const image: IImage = new Image("document.html", 20, 30);
    const documentItem: DocumentItem = new DocumentItem(image);

    expect(documentItem.getImage()).toBe(image);
    expect(documentItem.getParagraph()).toBeUndefined();
  });

  test("document item with paragraph should contain only paragraph", () => {
    const paragraph: IParagraph = new Paragraph("default paragraph text");
    const documentItem: DocumentItem = new DocumentItem(undefined, paragraph);

    expect(documentItem.getImage()).toBeUndefined();
    expect(documentItem.getParagraph()).toBe(paragraph);
  });

  test("document item with both paragraph and image should containt both elements", () => {
    const image: IImage = new Image("document.html", 20, 30);
    const paragraph: IParagraph = new Paragraph("default paragraph text");
    const documentItem: DocumentItem = new DocumentItem(image, paragraph);

    expect(documentItem.getImage()).toBe(image);
    expect(documentItem.getParagraph()).toBe(paragraph);
  });
});
