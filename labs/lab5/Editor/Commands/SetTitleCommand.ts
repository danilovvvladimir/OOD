import IDocument from "../Document/IDocument";
import AbstractCommand from "./AbstractCommand";

class SetTitleCommand extends AbstractCommand {
  private document: IDocument;
  private title: string;
  private previousTitle: string;

  constructor(document: IDocument, title: string) {
    super();

    this.document = document;
    this.title = title;
  }

  protected doExecute(): void {
    this.previousTitle = this.document.getTitle();
    this.document.setTitle(this.title);
  }

  protected doUnexecute(): void {
    this.document.setTitle(this.previousTitle);
  }
}

export default SetTitleCommand;
