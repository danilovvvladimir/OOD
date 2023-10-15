import IDocument from "../Document/IDocument";
import AbstractCommand from "./AbstractCommand";

class SaveCommand extends AbstractCommand {
  private document: IDocument;
  private path: string;

  constructor(document: IDocument, path: string) {
    super();

    this.document = document;
    this.path = path;
  }

  protected doExecute(): void {
    this.document.save(this.path);
  }

  protected doUnexecute(): void {}
}

export default SaveCommand;
