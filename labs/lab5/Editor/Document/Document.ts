import * as fs from "fs";

import DocumentItem from "../DocumentItem/DocumentItem";
import HTMLLayoutCreator from "../HTMLLayoutCreator/HTMLLayoutCreator";
import IHistory from "../History/IHistory";
import IImage from "../Image/IImage";
import Image from "../Image/Image";
import IParagraph from "../Paragraph/IParagraph";
import Paragraph from "../Paragraph/Paragraph";
import IDocument from "./IDocument";

class Document implements IDocument {
  private title: string;
  private items: DocumentItem[];
  private history: IHistory;

  constructor(history: IHistory, title: string = "") {
    this.title = title;
    this.items = [];
    this.history = history;
  }

  public insertParagraph(text: string, position: number): IParagraph {
    const newParagraph: IParagraph = new Paragraph(text);

    this.items.splice(position, 0, new DocumentItem(undefined, newParagraph));

    return newParagraph;
  }

  public insertImage(
    path: string,
    width: number,
    height: number,
    position: number,
  ): IImage {
    const newImage: IImage = new Image(path, width, height);

    this.items.splice(position, 0, new DocumentItem(newImage, undefined));

    return newImage;
  }

  public getItemsCount(): number {
    return this.items.length;
  }

  public getItem(index: number): DocumentItem {
    if (index < 0 || index >= this.items.length) {
      throw new Error(
        "Incorrect index. Index should be more positive and less than items count",
      );
    }

    return this.items[index];
  }

  public deleteItem(index: number): void {
    if (index < 0 || index >= this.items.length) {
      throw new Error(
        "Incorrect index. Index should be more positive and less than items count",
      );
    }

    this.items.splice(index, 1);
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public canUndo(): boolean {
    return this.history.canUndo();
  }

  public undo(): void {
    this.history.undo();
  }

  public canRedo(): boolean {
    return this.history.canRedo();
  }

  public redo(): void {
    this.history.redo();
  }

  public save(path: string): void {
    const htmlLayoutCreator: HTMLLayoutCreator = new HTMLLayoutCreator(
      this.getTitle(),
    );

    this.items.forEach((item: DocumentItem) => {
      if (item && item.getImage()) {
        const image: IImage = item.getImage();
        htmlLayoutCreator.addImage(
          image.getPath(),
          image.getWidth(),
          image.getHeight(),
        );
      }
      if (item && item.getParagraph()) {
        const paragprah: IParagraph = item.getParagraph();
        htmlLayoutCreator.addParagraph(paragprah.getText());
      }
    });

    fs.writeFile(path, htmlLayoutCreator.createHTMLLayout(), function (err) {
      if (err) throw err;
    });
  }
}

export default Document;
