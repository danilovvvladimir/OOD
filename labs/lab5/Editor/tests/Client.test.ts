import LineByLineReader from "line-by-line";
import Client from "../Client/Client";

describe("Testing client", () => {
  const log = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = log;
  });

  test("insert paragraph and exit", async () => {
    const rl: LineByLineReader = new LineByLineReader(
      "command/testFiles/Client/insertParagraphExit.txt",
    );
    const client: Client = new Client(rl);

    await client.startProcessingStream();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[3][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[4][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[5][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[6][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[7][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[8][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[9][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[10][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[11][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[12][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[13][0]).toBe(
      "Exit — closes the program",
    );
    expect((console.log as jest.Mock).mock.calls[14][0]).toBe(
      "Inserting paragraph was successfully executed",
    );
  });

  test("insert image and exit", async () => {
    const rl: LineByLineReader = new LineByLineReader(
      "command/testFiles/Client/insertImageExit.txt",
    );
    const client: Client = new Client(rl);

    await client.startProcessingStream();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[3][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[4][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[5][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[6][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[7][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[8][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[9][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[10][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[11][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[12][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[13][0]).toBe(
      "Exit — closes the program",
    );
    expect((console.log as jest.Mock).mock.calls[14][0]).toBe(
      "Inserting image was successfully executed",
    );
  });

  test("set title and exit", async () => {
    const rl: LineByLineReader = new LineByLineReader(
      "command/testFiles/Client/setTitleExit.txt",
    );
    const client: Client = new Client(rl);

    await client.startProcessingStream();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[3][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[4][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[5][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[6][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[7][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[8][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[9][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[10][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[11][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[12][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[13][0]).toBe(
      "Exit — closes the program",
    );
    expect((console.log as jest.Mock).mock.calls[14][0]).toBe(
      "Setting title was successfully executed",
    );
  });

  test("list and exit", async () => {
    const rl: LineByLineReader = new LineByLineReader(
      "command/testFiles/Client/listExit.txt",
    );
    const client: Client = new Client(rl);

    await client.startProcessingStream();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[3][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[4][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[5][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[6][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[7][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[8][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[9][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[10][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[11][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[12][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[13][0]).toBe(
      "Exit — closes the program",
    );
    expect((console.log as jest.Mock).mock.calls[14][0]).toBe("Title:");
  });

  test("replace text and exit", async () => {
    const rl: LineByLineReader = new LineByLineReader(
      "command/testFiles/Client/insertParagraphReplaceTextExit.txt",
    );
    const client: Client = new Client(rl);

    await client.startProcessingStream();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[3][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[4][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[5][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[6][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[7][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[8][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[9][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[10][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[11][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[12][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[13][0]).toBe(
      "Exit — closes the program",
    );
    expect((console.log as jest.Mock).mock.calls[14][0]).toBe(
      "Inserting paragraph was successfully executed",
    );
    expect((console.log as jest.Mock).mock.calls[15][0]).toBe(
      "Replacing text was successfully executed",
    );
  });

  test("resize image and exit", async () => {
    const rl: LineByLineReader = new LineByLineReader(
      "command/testFiles/Client/insertImageResizeImageExit.txt",
    );
    const client: Client = new Client(rl);

    await client.startProcessingStream();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[3][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[4][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[5][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[6][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[7][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[8][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[9][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[10][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[11][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[12][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[13][0]).toBe(
      "Exit — closes the program",
    );
    expect((console.log as jest.Mock).mock.calls[14][0]).toBe(
      "Inserting image was successfully executed",
    );
    expect((console.log as jest.Mock).mock.calls[15][0]).toBe(
      "Resizing image was successfully executed",
    );
  });

  test("delete item and exit", async () => {
    const rl: LineByLineReader = new LineByLineReader(
      "command/testFiles/Client/insertParagraphDeleteItemExit.txt",
    );
    const client: Client = new Client(rl);

    await client.startProcessingStream();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[3][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[4][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[5][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[6][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[7][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[8][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[9][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[10][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[11][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[12][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[13][0]).toBe(
      "Exit — closes the program",
    );
    expect((console.log as jest.Mock).mock.calls[14][0]).toBe(
      "Inserting paragraph was successfully executed",
    );
    expect((console.log as jest.Mock).mock.calls[15][0]).toBe(
      "Deleting item was successfully executed",
    );
  });

  test("help and exit", async () => {
    const rl: LineByLineReader = new LineByLineReader(
      "command/testFiles/Client/helpExit.txt",
    );
    const client: Client = new Client(rl);

    await client.startProcessingStream();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[3][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[4][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[5][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[6][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[7][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[8][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[9][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[10][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[11][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[12][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[13][0]).toBe(
      "Exit — closes the program",
    );
    expect((console.log as jest.Mock).mock.calls[14][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[15][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[16][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[17][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[18][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[19][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[20][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[21][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[22][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[23][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[24][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[25][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[26][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[27][0]).toBe(
      "Exit — closes the program",
    );
  });

  test("undo and exit", async () => {
    const rl: LineByLineReader = new LineByLineReader(
      "command/testFiles/Client/undoExit.txt",
    );
    const client: Client = new Client(rl);

    await client.startProcessingStream();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[3][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[4][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[5][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[6][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[7][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[8][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[9][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[10][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[11][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[12][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[13][0]).toBe(
      "Exit — closes the program",
    );
    expect((console.log as jest.Mock).mock.calls[14][0]).toBe(
      "Error: Can not undo command",
    );
  });

  test("redo and exit", async () => {
    const rl: LineByLineReader = new LineByLineReader(
      "command/testFiles/Client/redoExit.txt",
    );
    const client: Client = new Client(rl);

    await client.startProcessingStream();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[3][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[4][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[5][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[6][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[7][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[8][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[9][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[10][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[11][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[12][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[13][0]).toBe(
      "Exit — closes the program",
    );
    expect((console.log as jest.Mock).mock.calls[14][0]).toBe(
      "Error: Can not redo command",
    );
  });

  test("save and exit", async () => {
    const rl: LineByLineReader = new LineByLineReader(
      "command/testFiles/Client/saveExit.txt",
    );
    const client: Client = new Client(rl);

    await client.startProcessingStream();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[3][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[4][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[5][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[6][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[7][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[8][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[9][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[10][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[11][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[12][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[13][0]).toBe(
      "Exit — closes the program",
    );
    expect((console.log as jest.Mock).mock.calls[14][0]).toBe(
      "Saving was successfully executed",
    );
  });

  test("create new macrocommand and exit", async () => {
    const rl: LineByLineReader = new LineByLineReader(
      "command/testFiles/Client/macrocommandExit.txt",
    );
    const client: Client = new Client(rl);

    await client.startProcessingStream();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[3][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[4][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[5][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[6][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[7][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[8][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[9][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[10][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[11][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[12][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[13][0]).toBe(
      "Exit — closes the program",
    );
    expect((console.log as jest.Mock).mock.calls[14][0]).toBe(
      "Macrocommand recording has successfully stopped. New macrocommand was added to available commands",
    );
    expect((console.log as jest.Mock).mock.calls[15][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[16][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[17][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[18][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[19][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[20][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[21][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[22][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[23][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[24][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[25][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[26][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[27][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[28][0]).toBe(
      "Exit — closes the program",
    );
    expect((console.log as jest.Mock).mock.calls[29][0]).toBe(
      "MacroInsert — inserts paragraph and image",
    );
  });

  test("exit", async () => {
    const rl: LineByLineReader = new LineByLineReader(
      "command/testFiles/Client/exit.txt",
    );
    const client: Client = new Client(rl);

    await client.startProcessingStream();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "InsertParagraph — <position>|end <text> — inserts paragraph to position with specific text",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "InsertImage — <position>|end <width> <height> <path> — inserts image to position with specific path, width and height",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "SetTitle — <text> — sets title to the current document",
    );
    expect((console.log as jest.Mock).mock.calls[3][0]).toBe(
      "List — shows the list of items of the current document",
    );
    expect((console.log as jest.Mock).mock.calls[4][0]).toBe(
      "ReplaceText — <position>|end <text> — replaces text of the paragraph in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[5][0]).toBe(
      "ResizeImage — <position>|end <width> <height> — resizes image in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[6][0]).toBe(
      "DeleteItem — <position>|end — deletes item in the specific position",
    );
    expect((console.log as jest.Mock).mock.calls[7][0]).toBe(
      "Help — shows list of available commands",
    );
    expect((console.log as jest.Mock).mock.calls[8][0]).toBe(
      "Undo — reverts last command",
    );
    expect((console.log as jest.Mock).mock.calls[9][0]).toBe(
      "Redo — reverts last reverted command",
    );
    expect((console.log as jest.Mock).mock.calls[10][0]).toBe(
      "Save — saves document as html file to the specific path",
    );
    expect((console.log as jest.Mock).mock.calls[11][0]).toBe(
      "begin_macro — <macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[12][0]).toBe(
      "end_macro — stops recording macrocommand",
    );
    expect((console.log as jest.Mock).mock.calls[13][0]).toBe(
      "Exit — closes the program",
    );
  });
});
