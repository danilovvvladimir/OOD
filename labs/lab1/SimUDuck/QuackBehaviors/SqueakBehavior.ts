import { IQuackBehavior } from "./IQuackBehavior";

export class SqueakBehavior implements IQuackBehavior {
  public quack(): void {
    console.log("Squeek!!!");
  }
}
