import { ICanvas } from "../Canvas/ICanvas";
import PictureDraft from "../PictureDraft/PictureDraft";

class Painter {
  public static drawPicture(pictureDraft: PictureDraft, canvas: ICanvas) {
    const shapesSize = pictureDraft.getShapesSize();

    for (let i = 0; i < shapesSize; i++) {
      pictureDraft.getShape(i).draw(canvas);
    }
  }
}

export default Painter;
