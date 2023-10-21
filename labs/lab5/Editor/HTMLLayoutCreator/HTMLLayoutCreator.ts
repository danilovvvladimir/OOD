class HTMLLayoutCreator {
  private title: string;
  private layoutText: string[];

  constructor(title: string = "Default title") {
    this.title = title;
    this.layoutText = [];
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public addParagraph(text: string): void {
    this.layoutText.push("<div>" + text + "</div>");
  }

  public addImage(path: string, width: number, height: number): void {
    this.layoutText.push(
      '<img src="' +
        path +
        '" width="' +
        width +
        '" height="' +
        height +
        '" />',
    );
  }

  public createHTMLLayout(): string {
    let htmlLayout = "";

    htmlLayout += "<!DOCTYPE html>\n";
    htmlLayout += '<html lang="ru">\n';
    htmlLayout += this.getHead();
    htmlLayout += "<body>\n";
    this.layoutText.forEach((layoutText: string) => {
      htmlLayout += "  ";
      htmlLayout += layoutText;
      htmlLayout += "\n";
    });
    htmlLayout += "</body>\n";
    htmlLayout += "</html>";

    return htmlLayout;
  }

  private getHead(): string {
    return (
      "<head>\n" +
      '  <meta charset="utf-8">\n' +
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
      "  <title>" +
      this.title +
      "</title>\n" +
      "</head>\n"
    );
  }
}

export default HTMLLayoutCreator;
