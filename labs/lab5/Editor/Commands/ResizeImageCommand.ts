import IDocument from "../Document/IDocument";
import DocumentItem from "../DocumentItem/DocumentItem";
import AbstractCommand from "./AbstractCommand";

class ResizeImageCommand extends AbstractCommand {
  private document: IDocument;
  private position: number;
  private width: number;
  private height: number;
  private previousWidth: number;
  private previousHeight: number;

  constructor(
    document: IDocument,
    width: number,
    height: number,
    position: number,
  ) {
    super();

    this.document = document;
    this.width = width;
    this.height = height;
    this.position = position;
  }

  protected doExecute(): void {
    if (this.document.getItemsCount() <= this.position) {
      throw new Error("Incorrect item position");
    }

    const documentItem: DocumentItem = this.document.getItem(this.position);
    if (!documentItem.getImage()) {
      throw new Error("Item in the position is not an image");
    }

    this.previousWidth = documentItem.getImage().getWidth();
    this.previousHeight = documentItem.getImage().getHeight();
    documentItem.getImage().resize(this.width, this.height);
  }

  protected doUnexecute(): void {
    this.document
      .getItem(this.position)
      .getImage()
      .resize(this.previousWidth, this.previousHeight);
  }
}

export default ResizeImageCommand;
