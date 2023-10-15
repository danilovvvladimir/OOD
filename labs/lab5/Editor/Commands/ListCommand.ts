import IDocument from "../Document/IDocument";
import DocumentItem from "../DocumentItem/DocumentItem";
import IImage from "../Image/IImage";
import IParagraph from "../Paragraph/IParagraph";
import AbstractCommand from "./AbstractCommand";

class ListCommand extends AbstractCommand {
  private document: IDocument;

  constructor(document: IDocument) {
    super();

    this.document = document;
  }

  protected doExecute(): void {
    console.log("Title:", this.document.getTitle());

    for (let i = 0; i < this.document.getItemsCount(); i++) {
      const item: DocumentItem = this.document.getItem(i);

      if (item && item.getImage()) {
        const image: IImage = item.getImage();
        console.log(
          i +
            ". Image: " +
            image.getWidth() +
            " " +
            image.getHeight() +
            " " +
            image.getPath(),
        );
      }
      if (item && item.getParagraph()) {
        const paragraph: IParagraph = item.getParagraph();
        console.log(i + ". Paragraph: " + paragraph.getText());
      }
    }
  }

  protected doUnexecute(): void {}
}

export default ListCommand;
