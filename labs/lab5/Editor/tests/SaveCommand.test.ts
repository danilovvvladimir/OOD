import SaveCommand from "../Commands/SaveCommand";
import IDocument from "../Document/IDocument";
import DocumentItem from "../DocumentItem/DocumentItem";
import IImage from "../Image/IImage";
import Image from "../Image/Image";
import IParagraph from "../Paragraph/IParagraph";
import Paragraph from "../Paragraph/Paragraph";

const saveMockFunction = jest.fn((path: string) => {});

class CMockDocument implements IDocument {
  private items: DocumentItem[];

  constructor() {
    this.items = [];
  }

  insertParagraph(text: string, position: number): IParagraph {
    return new Paragraph("");
  }
  insertImage(
    path: string,
    width: number,
    height: number,
    position: number,
  ): IImage {
    return new Image("", 0, 0);
  }
  getItemsCount(): number {
    return this.items.length;
  }
  getItem(index: number): DocumentItem {
    return this.items[index];
  }
  deleteItem(index: number): void {}
  getTitle(): string {
    return "";
  }
  setTitle(title: string): void {}
  canUndo(): boolean {
    return false;
  }
  undo(): void {}
  canRedo(): boolean {
    return false;
  }
  redo(): void {}
  save(path: string): void {
    saveMockFunction(path);
  }
}

describe("Testing save command", () => {
  beforeEach(() => {
    saveMockFunction.mockClear();
  });

  test("execute save command", () => {
    const mockDocument: IDocument = new CMockDocument();
    const saveCommand: SaveCommand = new SaveCommand(
      mockDocument,
      "document.html",
    );

    saveCommand.execute();

    expect(saveMockFunction).toBeCalledTimes(1);
    expect(saveMockFunction.mock.calls[0][0]).toEqual("document.html");
  });
});
