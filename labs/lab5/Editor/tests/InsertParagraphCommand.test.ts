import InsertParagraphCommand from "../Commands/InsertParagraphCommand";
import IDocument from "../Document/IDocument";
import DocumentItem from "../DocumentItem/DocumentItem";
import IImage from "../Image/IImage";
import Image from "../Image/Image";
import IParagraph from "../Paragraph/IParagraph";
import Paragraph from "../Paragraph/Paragraph";

const insertParagraphMockFunction = jest.fn(
  (text: string, position: number) => {
    return new Paragraph(text);
  },
);
const deleteItemMockFunction = jest.fn((index: number) => {});

class CMockDocument implements IDocument {
  private items: DocumentItem[];

  constructor() {
    this.items = [];
  }

  insertParagraph(text: string, position: number): IParagraph {
    const insertedParagraph: IParagraph = insertParagraphMockFunction(
      text,
      position,
    );

    this.items.splice(
      position,
      0,
      new DocumentItem(undefined, insertedParagraph),
    );

    return insertedParagraph;
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
  deleteItem(index: number): void {
    deleteItemMockFunction(index);
  }
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
  save(path: string): void {}
}

describe("test insert paragraph command", () => {
  beforeEach(() => {
    insertParagraphMockFunction.mockClear();
    deleteItemMockFunction.mockClear();
  });

  test("execute insert paragraph with 0 index", () => {
    const mockDocument: CMockDocument = new CMockDocument();
    const insertParagraphCommand: InsertParagraphCommand =
      new InsertParagraphCommand(mockDocument, "svetocopy", 0);

    insertParagraphCommand.execute();

    expect(insertParagraphMockFunction).toHaveBeenCalledTimes(1);
    expect(insertParagraphMockFunction.mock.calls[0][0]).toEqual("svetocopy");
    expect(insertParagraphMockFunction.mock.calls[0][1]).toEqual(0);
  });

  test("execute insert paragraph with 1 index", () => {
    const mockDocument: CMockDocument = new CMockDocument();
    const insertParagraphCommand: InsertParagraphCommand =
      new InsertParagraphCommand(mockDocument, "svetocopy", 1);

    insertParagraphCommand.execute();

    expect(insertParagraphMockFunction).toHaveBeenCalledTimes(1);
    expect(insertParagraphMockFunction.mock.calls[0][0]).toEqual("svetocopy");
    expect(insertParagraphMockFunction.mock.calls[0][1]).toEqual(1);
  });

  test("unexecute insert paragraph before inserting", () => {
    const mockDocument: CMockDocument = new CMockDocument();
    const insertParagraphCommand: InsertParagraphCommand =
      new InsertParagraphCommand(mockDocument, "svetocopy", 1);

    insertParagraphCommand.unexecute();

    expect(insertParagraphMockFunction).toHaveBeenCalledTimes(0);
    expect(deleteItemMockFunction).toHaveBeenCalledTimes(0);
  });

  test("unexecute insert paragraph after inserting", () => {
    const mockDocument: CMockDocument = new CMockDocument();
    const insertParagraphCommand: InsertParagraphCommand =
      new InsertParagraphCommand(mockDocument, "svetocopy", 1);

    insertParagraphCommand.execute();
    insertParagraphCommand.unexecute();

    expect(insertParagraphMockFunction).toHaveBeenCalledTimes(1);
    expect(deleteItemMockFunction).toHaveBeenCalledTimes(1);
    expect(deleteItemMockFunction.mock.calls[0][0]).toEqual(1);
  });
});
