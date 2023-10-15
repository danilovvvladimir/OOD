import ICommand from "../Commands/ICommand";
import Document from "../Document/Document";
import History from "../History/History";
import IHistory from "../History/IHistory";

import * as fs from "fs";

const canUndoMockFunction = jest.fn(() => false);
const undoMockFunction = jest.fn(() => {});
const canRedoMockFunction = jest.fn(() => false);
const redoMockFunction = jest.fn(() => {});
const addAndExecuteCommandMockFunction = jest.fn((command: ICommand) => {});

class MockHistory implements IHistory {
  constructor() {}

  public canUndo(): boolean {
    return canUndoMockFunction();
  }
  public undo(): void {
    undoMockFunction();
  }

  public canRedo(): boolean {
    return canRedoMockFunction();
  }
  public redo(): void {
    redoMockFunction();
  }

  public addAndExecuteCommand(command: ICommand): void {
    addAndExecuteCommandMockFunction(command);
  }
}

describe("test document", () => {
  test("insertParagraph should insert paragraph correctly", () => {
    const history: IHistory = new History();
    const document: Document = new Document(history);

    document.insertParagraph("kittens never die", 0);

    expect(document.getItemsCount()).toBe(1);
    expect(document.getItem(0).getParagraph().getText()).toBe(
      "kittens never die",
    );
  });

  test("insertImage should insert image correctly", () => {
    const history: IHistory = new History();
    const document: Document = new Document(history);

    document.insertImage("document.html", 200, 300, 0);

    expect(document.getItemsCount()).toBe(1);
    expect(document.getItem(0).getImage().getPath()).toBe("document.html");
    expect(document.getItem(0).getImage().getWidth()).toBe(200);
    expect(document.getItem(0).getImage().getHeight()).toBe(300);
  });

  test("getItemsCount of empty document should return 0", () => {
    const history: IHistory = new History();
    const document: Document = new Document(history);

    expect(document.getItemsCount()).toBe(0);
  });

  test("getItemsCount of document with 1 item should return 1", () => {
    const history: IHistory = new History();
    const document: Document = new Document(history);
    document.insertImage("document.html", 200, 300, 0);

    expect(document.getItemsCount()).toBe(1);
  });

  test("getItem by position should return the same item, that had inserted before", () => {
    const history: IHistory = new History();
    const document: Document = new Document(history);
    document.insertImage("document.html", 200, 300, 0);

    expect(document.getItem(0).getImage().getPath()).toBe("document.html");
    expect(document.getItem(0).getImage().getWidth()).toBe(200);
    expect(document.getItem(0).getImage().getHeight()).toBe(300);
  });

  test("getTitle of empty titled document should return empty string", () => {
    const history: IHistory = new History();

    const document: Document = new Document(history);

    expect(document.getTitle()).toBe("");
  });

  test("getTitle of document with arbitrary title should return its title", () => {
    const history: IHistory = new History();

    const document: Document = new Document(history, "My website");

    expect(document.getTitle()).toBe("My website");
  });

  test("setTitle should set title to the document", () => {
    const history: IHistory = new History();
    const document: Document = new Document(history);

    document.setTitle("My website");

    expect(document.getTitle()).toBe("My website");
  });

  test("canUndo should invoke function canUndo in history", () => {
    const history: IHistory = new MockHistory();
    const document: Document = new Document(history);

    document.canUndo();

    expect(canUndoMockFunction).toBeCalledTimes(1);
  });

  test("undo should invoke function undo in history", () => {
    const history: IHistory = new MockHistory();
    const document: Document = new Document(history);

    document.undo();

    expect(undoMockFunction).toBeCalledTimes(1);
  });

  test("canRedo should invoke function canRedo in history", () => {
    const history: IHistory = new MockHistory();
    const document: Document = new Document(history);

    document.canRedo();

    expect(canRedoMockFunction).toBeCalledTimes(1);
  });

  test("redo should invoke function redo in history", () => {
    const history: IHistory = new MockHistory();
    const document: Document = new Document(history);

    document.redo();

    expect(redoMockFunction).toBeCalledTimes(1);
  });

  // test("save should save document in html format to defined path", async () => {
  //   const history: IHistory = new History();
  //   const document: Document = new Document(history);
  //   const filePath: string = "command/document.html";
  //   if (fs.existsSync(filePath)) {
  //     fs.unlinkSync(filePath);
  //   }

  //   document.save(filePath);

  //   expect(fs.existsSync(filePath)).toBeTruthy();
  // });
});
