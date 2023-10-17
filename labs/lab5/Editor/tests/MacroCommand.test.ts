import MacroCommand from "../Commands/MacroCommand";
import SaveCommand from "../Commands/SaveCommand";
import SetTitleCommand from "../Commands/SetTitleCommand";
import IDocument from "../Document/IDocument";
import DocumentItem from "../DocumentItem/DocumentItem";
import IImage from "../Image/IImage";
import Image from "../Image/Image";
import IParagraph from "../Paragraph/IParagraph";
import Paragraph from "../Paragraph/Paragraph";

const saveMockFunction = jest.fn((path: string) => {});
const setTitleMockFunction = jest.fn((title: string) => {});

class MockDocument implements IDocument {
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
  save(path: string): void {
    saveMockFunction(path);
  }
}

describe("Testing macrocommand", () => {
  beforeEach(() => {
    saveMockFunction.mockClear();
    setTitleMockFunction.mockClear();
  });

  test("execute macrocommand with commands list consists of one command", () => {
    const mockDocument: IDocument = new MockDocument();
    const saveCommand: SaveCommand = new SaveCommand(
      mockDocument,
      "document.html",
    );
    const macroCommand: MacroCommand = new MacroCommand([saveCommand]);

    macroCommand.execute();

    expect(saveMockFunction).toBeCalledTimes(1);
    expect(saveMockFunction.mock.calls[0][0]).toEqual("document.html");
  });

  test("unexecute macrocommand with commands list consists of one command", () => {
    const mockDocument: IDocument = new MockDocument();
    const saveCommand: SaveCommand = new SaveCommand(
      mockDocument,
      "document.html",
    );
    const macroCommand: MacroCommand = new MacroCommand([saveCommand]);

    macroCommand.execute();
    macroCommand.unexecute();

    expect(saveMockFunction).toBeCalledTimes(1);
    expect(saveMockFunction.mock.calls[0][0]).toEqual("document.html");
  });

  test("execute macrocommand with commands list consists of two commands", () => {
    const mockDocument: IDocument = new MockDocument();
    const saveCommand: SaveCommand = new SaveCommand(
      mockDocument,
      "document.html",
    );
    const setTitleCommand: SetTitleCommand = new SetTitleCommand(
      mockDocument,
      "new title",
    );
    const macroCommand: MacroCommand = new MacroCommand([
      saveCommand,
      setTitleCommand,
    ]);

    macroCommand.execute();

    expect(saveMockFunction).toBeCalledTimes(1);
    expect(saveMockFunction.mock.calls[0][0]).toEqual("document.html");
    expect(setTitleMockFunction).toBeCalledTimes(1);
    expect(setTitleMockFunction.mock.calls[0][0]).toEqual("new title");
  });

  test("unexecute macrocommand with commands list consists of two commands", () => {
    const mockDocument: IDocument = new MockDocument();
    const saveCommand: SaveCommand = new SaveCommand(
      mockDocument,
      "document.html",
    );
    const setTitleCommand: SetTitleCommand = new SetTitleCommand(
      mockDocument,
      "new title",
    );
    const macroCommand: MacroCommand = new MacroCommand([
      saveCommand,
      setTitleCommand,
    ]);

    macroCommand.execute();
    macroCommand.unexecute();

    expect(saveMockFunction).toBeCalledTimes(1);
    expect(saveMockFunction.mock.calls[0][0]).toEqual("document.html");
    expect(setTitleMockFunction).toBeCalledTimes(2);
    expect(setTitleMockFunction.mock.calls[0][0]).toEqual("new title");
    expect(setTitleMockFunction.mock.calls[1][0]).toEqual("");
  });
});
