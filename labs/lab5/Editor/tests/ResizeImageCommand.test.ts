import InsertImageCommand from "../Commands/InsertImageCommand";
import InsertParagraphCommand from "../Commands/InsertParagraphCommand";
import ResizeImageCommand from "../Commands/ResizeImageCommand";
import Document from "../Document/Document";
import History from "../History/History";

describe("test resize image command", () => {
  const log = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = log;
  });

  test("execute resize image command at image", () => {
    const mockHistory: History = new History();
    const mockDocument: Document = new Document(mockHistory);
    const insertImageCommand: InsertImageCommand = new InsertImageCommand(
      mockDocument,
      "document.html",
      10,
      20,
      0,
    );
    const resizeImageCommand: ResizeImageCommand = new ResizeImageCommand(
      mockDocument,
      30,
      40,
      0,
    );

    insertImageCommand.execute();
    resizeImageCommand.execute();

    expect(mockDocument.getItemsCount()).toBe(1);
    expect(mockDocument.getItem(0).getImage().getWidth()).toBe(30);
    expect(mockDocument.getItem(0).getImage().getHeight()).toBe(40);
  });

  test("execute resize image command at paragraph", () => {
    const mockHistory: History = new History();
    const mockDocument: Document = new Document(mockHistory);
    const insertParagraphCommand: InsertParagraphCommand =
      new InsertParagraphCommand(mockDocument, "default text", 0);
    const resizeImageCommand: ResizeImageCommand = new ResizeImageCommand(
      mockDocument,
      30,
      40,
      0,
    );

    insertParagraphCommand.execute();

    expect(() => resizeImageCommand.execute()).toThrowError(
      "Item in the position is not an image",
    );
  });

  test("execute resize image command at nonexistent item", () => {
    const mockHistory: History = new History();
    const mockDocument: Document = new Document(mockHistory);
    const resizeImageCommand: ResizeImageCommand = new ResizeImageCommand(
      mockDocument,
      30,
      40,
      0,
    );

    expect(() => resizeImageCommand.execute()).toThrowError(
      "Incorrect item position",
    );
  });
});
