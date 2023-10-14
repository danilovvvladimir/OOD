import * as readlineSync from "readline-sync";

import PictureDraft from "../PictureDraft/PictureDraft";
import { IShapeFactory } from "../ShapeFactory/IShapeFactory";
import IDesigner from "./IDesigner";

class Designer implements IDesigner {
  private factory: IShapeFactory;

  constructor(factory: IShapeFactory) {
    this.factory = factory;
  }

  public createDraft(): PictureDraft {
    const pictureDraft = new PictureDraft();

    while (true) {
      const commandLine: string = readlineSync.question(
        'Enter a command (or type "exit" to quit): ',
      );

      if (commandLine === "exit") {
        break;
      } else {
        try {
          pictureDraft.addShape(this.factory.createShape(commandLine));
        } catch (error) {
          console.log("Error: " + error.message);
        }
      }
    }

    console.log(pictureDraft.getShapesSize());

    return pictureDraft;
  }
}

export default Designer;
