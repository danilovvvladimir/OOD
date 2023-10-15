import UndoCommand from "../Commands/UndoCommand ";
import IDocument from "../Document/IDocument";
import DocumentItem from "../DocumentItem/DocumentItem";
import IImage from "../Image/IImage";
import Image from "../Image/Image";
import IParagraph from "../Paragraph/IParagraph";
import Paragraph from "../Paragraph/Paragraph";

const undoMockFunction = jest.fn(() => {});
const falsyCanUndoMockFunction = jest.fn(() => {
  return false;
});
const truthyCanUndoMockFunction = jest.fn(() => {
  return true;
});
const redoMockFunction = jest.fn(() => {});
const falsyCanRedoMockFunction = jest.fn(() => {
  return false;
});
const truthyCanRedoMockFunction = jest.fn(() => {
  return true;
});

class FalsyMockDocument implements IDocument {
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
    return falsyCanUndoMockFunction();
  }
  undo(): void {
    undoMockFunction();
  }
  canRedo(): boolean {
    return falsyCanRedoMockFunction();
  }
  redo(): void {
    redoMockFunction();
  }
  save(path: string): void {}
}

class FalsyTruthyMockDocument implements IDocument {
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
    return falsyCanUndoMockFunction();
  }
  undo(): void {
    undoMockFunction();
  }
  canRedo(): boolean {
    return truthyCanRedoMockFunction();
  }
  redo(): void {
    redoMockFunction();
  }
  save(path: string): void {}
}

class TruthyMockDocument implements IDocument {
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
    return truthyCanUndoMockFunction();
  }
  undo(): void {
    undoMockFunction();
  }
  canRedo(): boolean {
    return truthyCanRedoMockFunction();
  }
  redo(): void {
    redoMockFunction();
  }
  save(path: string): void {}
}

class TruthyFalsyMockDocument implements IDocument {
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
    return truthyCanUndoMockFunction();
  }
  undo(): void {
    undoMockFunction();
  }
  canRedo(): boolean {
    return falsyCanRedoMockFunction();
  }
  redo(): void {
    redoMockFunction();
  }
  save(path: string): void {}
}

describe("test undo command", () => {
  beforeEach(() => {
    undoMockFunction.mockClear();
    falsyCanUndoMockFunction.mockClear();
    truthyCanUndoMockFunction.mockClear();
    redoMockFunction.mockClear();
    falsyCanRedoMockFunction.mockClear();
    truthyCanRedoMockFunction.mockClear();
  });

  test("unexecute undo command with falsy can undo and redo", () => {
    const mockDocument: IDocument = new FalsyMockDocument();
    const undoCommand: UndoCommand = new UndoCommand(mockDocument);

    expect(() => undoCommand.execute()).toThrowError("Can not undo command");
    expect(() => undoCommand.unexecute()).toThrowError(
      "Can not unexecute undo command",
    );
    expect(falsyCanUndoMockFunction).toHaveBeenCalledTimes(1);
    expect(undoMockFunction).toHaveBeenCalledTimes(0);
    expect(falsyCanRedoMockFunction).toHaveBeenCalledTimes(1);
    expect(redoMockFunction).toHaveBeenCalledTimes(0);
  });

  test("unexecute undo command with falsy can undo and truthy can redo", () => {
    const mockDocument: IDocument = new FalsyTruthyMockDocument();
    const undoCommand: UndoCommand = new UndoCommand(mockDocument);

    expect(() => undoCommand.execute()).toThrowError("Can not undo command");
    undoCommand.unexecute();
    expect(falsyCanUndoMockFunction).toHaveBeenCalledTimes(1);
    expect(undoMockFunction).toHaveBeenCalledTimes(0);
    expect(truthyCanRedoMockFunction).toHaveBeenCalledTimes(1);
    expect(redoMockFunction).toHaveBeenCalledTimes(1);
  });

  test("execute undo command with truthy can undo and falsy can redo", () => {
    const mockDocument: IDocument = new TruthyFalsyMockDocument();
    const undoCommand: UndoCommand = new UndoCommand(mockDocument);

    undoCommand.execute();

    expect(truthyCanUndoMockFunction).toHaveBeenCalledTimes(1);
    expect(undoMockFunction).toHaveBeenCalledTimes(1);
    expect(falsyCanRedoMockFunction).toHaveBeenCalledTimes(0);
    expect(redoMockFunction).toHaveBeenCalledTimes(0);
  });

  test("execute undo command with truthy can undo and redo", () => {
    const mockDocument: IDocument = new TruthyMockDocument();
    const undoCommand: UndoCommand = new UndoCommand(mockDocument);

    undoCommand.execute();

    expect(truthyCanUndoMockFunction).toHaveBeenCalledTimes(1);
    expect(undoMockFunction).toHaveBeenCalledTimes(1);
    expect(truthyCanRedoMockFunction).toHaveBeenCalledTimes(0);
    expect(redoMockFunction).toHaveBeenCalledTimes(0);
  });
});
