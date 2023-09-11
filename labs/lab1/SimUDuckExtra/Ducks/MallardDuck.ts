import { WaltzDanceBehavior } from "../DanceBehaviors/WaltzDanceBehavior";
import { FlyWithWingsBehavior } from "../FlyBehaviors/FlyWithWingsBehavior";
import { QuackBehavior } from "../QuackBehaviors/QuackBehavior";
import { Duck } from "./Duck";

export class MallardDuck extends Duck {
  constructor() {
    super(
      new FlyWithWingsBehavior(),
      new QuackBehavior(),
      new WaltzDanceBehavior(),
    );
  }

  public display(): void {
    console.log("*Mallard Duck displayed*");
  }
}
