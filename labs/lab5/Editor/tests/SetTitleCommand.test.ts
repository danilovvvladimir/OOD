import SetTitleCommand from "../Commands/SetTitleCommand";
import IDocument from "../Document/IDocument";
import DocumentItem from "../DocumentItem/DocumentItem";
import IImage from "../Image/IImage";
import Image from "../Image/Image";
import IParagraph from "../Paragraph/IParagraph";
import Paragraph from "../Paragraph/Paragraph";

const setTitleMockFunction = jest.fn((title: string) => {});

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
  setTitle(title: string): void {
    setTitleMockFunction(title);
  }
  canUndo(): boolean {
    return false;
  }
  undo(): void {}
  canRedo(): boolean {
    return false;
  }
  redo(): void {}
  save(path: string): void {}
}

describe("Testing set title command", () => {
  beforeEach(() => {
    setTitleMockFunction.mockClear();
  });

  test("execute set title command", () => {
    const mockDocument: CMockDocument = new CMockDocument();
    const setTitleCommand: SetTitleCommand = new SetTitleCommand(
      mockDocument,
      "document name",
    );

    setTitleCommand.execute();

    expect(setTitleMockFunction).toHaveBeenCalledTimes(1);
    expect(setTitleMockFunction.mock.calls[0][0]).toEqual("document name");
  });

  test("unexecute set title before setting title", () => {
    const mockDocument: CMockDocument = new CMockDocument();
    const setTitleCommand: SetTitleCommand = new SetTitleCommand(
      mockDocument,
      "document name",
    );

    setTitleCommand.unexecute();

    expect(setTitleMockFunction).toHaveBeenCalledTimes(0);
  });

  test("unexecute insert image after setting title", () => {
    const mockDocument: CMockDocument = new CMockDocument();
    const setTitleCommand: SetTitleCommand = new SetTitleCommand(
      mockDocument,
      "document name",
    );

    setTitleCommand.execute();
    setTitleCommand.unexecute();

    expect(setTitleMockFunction).toHaveBeenCalledTimes(2);
    expect(setTitleMockFunction.mock.calls[0][0]).toEqual("document name");
    expect(setTitleMockFunction.mock.calls[1][0]).toEqual("");
  });
});
