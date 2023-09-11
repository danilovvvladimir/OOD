import { IQuackBehavior } from "./IQuackBehavior";

export class QuackBehavior implements IQuackBehavior {
  public quack(): void {
    console.log("Quack Quack!!!");
  }
}
