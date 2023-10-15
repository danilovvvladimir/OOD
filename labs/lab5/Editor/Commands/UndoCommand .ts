import IDocument from "../Document/IDocument";
import AbstractCommand from "./AbstractCommand";

class UndoCommand extends AbstractCommand {
  private document: IDocument;

  constructor(document: IDocument) {
    super();

    this.document = document;
  }

  protected doExecute(): void {
    if (this.document.canUndo()) {
      this.document.undo();
    } else {
      throw new Error("Can not undo command");
    }
  }

  protected doUnexecute(): void {
    if (this.document.canRedo()) {
      this.document.redo();
    } else {
      throw new Error("Can not unexecute undo command");
    }
  }
}

export default UndoCommand;
