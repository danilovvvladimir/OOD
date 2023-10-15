import IDocument from "../Document/IDocument";
import AbstractCommand from "./AbstractCommand";

class InsertParagraphCommand extends AbstractCommand {
  private document: IDocument;
  private position: number;
  private text: string;

  constructor(document: IDocument, text: string, position: number) {
    super();

    this.document = document;
    this.position = position;
    this.text = text;
  }

  protected doExecute(): void {
    this.document.insertParagraph(this.text, this.position);
  }

  protected doUnexecute(): void {
    this.document.deleteItem(this.position);
  }
}

export default InsertParagraphCommand;
