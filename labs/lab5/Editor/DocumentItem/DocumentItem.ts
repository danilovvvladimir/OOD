import IImage from "../Image/IImage";
import IParagraph from "../Paragraph/IParagraph";

class DocumentItem {
  private image: IImage;
  private paragraph: IParagraph;

  constructor(image?: IImage, paragraph?: IParagraph) {
    if (image) {
      this.image = image;
    }
    if (paragraph) {
      this.paragraph = paragraph;
    }
  }

  public getImage(): IImage {
    return this.image;
  }

  public getParagraph(): IParagraph {
    return this.paragraph;
  }
}

export default DocumentItem;
