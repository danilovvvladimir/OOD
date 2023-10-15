import ListCommand from "../Commands/ListCommand";
import Document from "../Document/Document";
import History from "../History/History";

describe("test list command", () => {
  const log = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = log;
  });

  test("execute list command with empty document", () => {
    const mockHistory: History = new History();
    const mockDocument: Document = new Document(mockHistory);
    const listCommand: ListCommand = new ListCommand(mockDocument);

    listCommand.execute();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Title:");
  });

  test("execute list command with paragraph", () => {
    const mockHistory: History = new History();
    const mockDocument: Document = new Document(mockHistory);
    const listCommand: ListCommand = new ListCommand(mockDocument);
    mockDocument.insertParagraph("paragraph text", 0);

    listCommand.execute();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Title:");
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "0. Paragraph: paragraph text",
    );
  });

  test("execute list command with paragraph and image", () => {
    const mockHistory: History = new History();
    const mockDocument: Document = new Document(mockHistory);
    const listCommand: ListCommand = new ListCommand(mockDocument);
    mockDocument.insertParagraph("paragraph text", 0);
    mockDocument.insertImage("document.html", 30, 40, 1);

    listCommand.execute();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Title:");
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "0. Paragraph: paragraph text",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "1. Image: 30 40 document.html",
    );
  });

  test("execute list command with paragraph and paragraph on the same position", () => {
    const mockHistory: History = new History();
    const mockDocument: Document = new Document(mockHistory);
    const listCommand: ListCommand = new ListCommand(mockDocument);
    mockDocument.insertParagraph("paragraph text", 0);
    mockDocument.insertParagraph("another paragraph text", 0);

    listCommand.execute();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Title:");
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "0. Paragraph: another paragraph text",
    );
  });

  test("unexecute list command should do nothing", () => {
    const mockHistory: History = new History();
    const mockDocument: Document = new Document(mockHistory);
    const listCommand: ListCommand = new ListCommand(mockDocument);

    listCommand.unexecute();

    expect(console.log as jest.Mock).toBeCalledTimes(0);
  });
});
