import DeleteItemCommand from "../Commands/DeleteItemCommand";
import InsertParagraphCommand from "../Commands/InsertParagraphCommand";
import Document from "../Document/Document";
import History from "../History/History";

describe("test delete item command", () => {
  const log = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = log;
  });

  test("execute delete item command at item", () => {
    const mockHistory: History = new History();
    const mockDocument: Document = new Document(mockHistory);
    const insertParagraphCommand: InsertParagraphCommand =
      new InsertParagraphCommand(mockDocument, "default text", 0);
    const deleteItemCommand: DeleteItemCommand = new DeleteItemCommand(
      mockDocument,
      0,
    );

    insertParagraphCommand.execute();
    deleteItemCommand.execute();

    expect(mockDocument.getItemsCount()).toBe(0);
  });

  test("execute delete item command at nonexistent item", () => {
    const mockHistory: History = new History();
    const mockDocument: Document = new Document(mockHistory);
    const deleteItemCommand: DeleteItemCommand = new DeleteItemCommand(
      mockDocument,
      0,
    );

    expect(() => deleteItemCommand.execute()).toThrowError(
      "Incorrect item position",
    );
  });
});
