import InsertImageCommand from "../Commands/InsertImageCommand";
import InsertParagraphCommand from "../Commands/InsertParagraphCommand";
import ReplaceTextCommand from "../Commands/ReplaceTextCommand";
import Document from "../Document/Document";
import History from "../History/History";

describe("Testing replace text command", () => {
  const log = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = log;
  });

  test("execute replace text command at paragraph", () => {
    const mockHistory: History = new History();
    const mockDocument: Document = new Document(mockHistory);
    const insertParagraphCommand: InsertParagraphCommand =
      new InsertParagraphCommand(mockDocument, "default text", 0);
    const replaceTextCommand: ReplaceTextCommand = new ReplaceTextCommand(
      mockDocument,
      "replaced text",
      0,
    );

    insertParagraphCommand.execute();
    replaceTextCommand.execute();

    expect(mockDocument.getItemsCount()).toBe(1);
    expect(mockDocument.getItem(0).getParagraph().getText()).toBe(
      "replaced text",
    );
  });

  test("execute replace text command at image", () => {
    const mockHistory: History = new History();
    const mockDocument: Document = new Document(mockHistory);
    const insertImageCommand: InsertImageCommand = new InsertImageCommand(
      mockDocument,
      "document.html",
      20,
      30,
      0,
    );
    const replaceTextCommand: ReplaceTextCommand = new ReplaceTextCommand(
      mockDocument,
      "replaced text",
      0,
    );

    insertImageCommand.execute();

    expect(() => replaceTextCommand.execute()).toThrowError(
      "Item in the position is not a paragraph",
    );
  });

  test("execute replace text command at nonexistent item", () => {
    const mockHistory: History = new History();
    const mockDocument: Document = new Document(mockHistory);
    const replaceTextCommand: ReplaceTextCommand = new ReplaceTextCommand(
      mockDocument,
      "replaced text",
      0,
    );

    expect(() => replaceTextCommand.execute()).toThrowError(
      "Incorrect item position",
    );
  });
});
