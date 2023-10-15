import IDocument from "../Document/IDocument";
import DocumentItem from "../DocumentItem/DocumentItem";
import AbstractCommand from "./AbstractCommand";

class ReplaceTextCommand extends AbstractCommand {
  private document: IDocument;
  private position: number;
  private text: string;
  private previousText: string;

  constructor(document: IDocument, text: string, position: number) {
    super();

    this.document = document;
    this.position = position;
    this.text = text;
  }

  protected doExecute(): void {
    if (this.document.getItemsCount() <= this.position) {
      throw new Error("Incorrect item position");
    }
    const documentItem: DocumentItem = this.document.getItem(this.position);
    if (!documentItem.getParagraph()) {
      throw new Error("Item in the position is not a paragraph");
    }

    this.previousText = documentItem.getParagraph().getText();
    documentItem.getParagraph().setText(this.text);
  }

  protected doUnexecute(): void {
    this.document
      .getItem(this.position)
      .getParagraph()
      .setText(this.previousText);
  }
}

export default ReplaceTextCommand;
