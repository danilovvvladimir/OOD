import DocumentItem from "../DocumentItem/DocumentItem";
import IImage from "../Image/IImage";
import IParagraph from "../Paragraph/IParagraph";

interface IDocument {
  insertParagraph(text: string, position: number): IParagraph;
  insertImage(
    path: string,
    width: number,
    height: number,
    position: number,
  ): IImage;
  getItemsCount(): number;
  getItem(index: number): DocumentItem;
  deleteItem(index: number): void;
  getTitle(): string;
  setTitle(title: string): void;
  canUndo(): boolean;
  undo(): void;
  canRedo(): boolean;
  redo(): void;
  save(path: string): void;
}

export default IDocument;
