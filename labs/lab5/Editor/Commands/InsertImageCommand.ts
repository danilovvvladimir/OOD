import IDocument from "../Document/IDocument";
import AbstractCommand from "./AbstractCommand";

class InsertImageCommand extends AbstractCommand {
  private document: IDocument;
  private path: string;
  private width: number;
  private height: number;
  private position: number;

  constructor(
    document: IDocument,
    path: string,
    width: number,
    height: number,
    position: number,
  ) {
    super();

    this.document = document;
    this.position = position;
    this.path = path;
    this.width = width;
    this.height = height;
  }

  protected doExecute(): void {
    this.document.insertImage(
      this.path,
      this.width,
      this.height,
      this.position,
    );
  }

  protected doUnexecute(): void {
    this.document.deleteItem(this.position);
  }
}

export default InsertImageCommand;
