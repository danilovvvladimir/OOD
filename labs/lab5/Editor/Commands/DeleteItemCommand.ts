import IDocument from "../Document/IDocument";
import DocumentItem from "../DocumentItem/DocumentItem";
import AbstractCommand from "./AbstractCommand";

class DeleteItemCommand extends AbstractCommand {
  private document: IDocument;
  private position: number;
  private previousItem: DocumentItem;

  constructor(document: IDocument, position: number) {
    super();

    this.document = document;
    this.position = position;
  }

  protected doExecute(): void {
    if (this.document.getItemsCount() <= this.position) {
      throw new Error("Incorrect item position");
    }

    this.previousItem = this.document.getItem(this.position);
    this.document.deleteItem(this.position);
  }

  protected doUnexecute(): void {
    if (this.previousItem.getImage()) {
      const image = this.previousItem.getImage();

      this.document.insertImage(
        image.getPath(),
        image.getWidth(),
        image.getHeight(),
        this.position,
      );
    }
    if (this.previousItem.getParagraph()) {
      const paragraph = this.previousItem.getParagraph();

      this.document.insertParagraph(paragraph.getText(), this.position);
    }
  }
}

export default DeleteItemCommand;
