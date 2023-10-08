import * as readline from "readline";

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
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("line", (commandLine: string) => {
      if (commandLine === "exit") {
        rl.close();
      } else {
        try {
          pictureDraft.addShape(
            this.factory.createShape(commandLine.split(" ")),
          );
        } catch (error) {
          console.log("Error: " + error.message);
        }
      }
    });

    return pictureDraft;
  }
}

export default Designer;
