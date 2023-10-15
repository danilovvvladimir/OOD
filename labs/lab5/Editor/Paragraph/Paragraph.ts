import IParagraph from "./IParagraph";

class Paragraph implements IParagraph {
  private text: string;

  constructor(text: string = "") {
    this.text = text;
  }

  public getText(): string {
    return this.text;
  }

  public setText(text: string): void {
    this.text = text;
  }
}

export default Paragraph;
