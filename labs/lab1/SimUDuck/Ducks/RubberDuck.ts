import { NoDanceBehavior } from "../DanceBehaviors/NoDanceBehavior";
import { FlyNoWayBehavior } from "../FlyBehaviors/FlyNoWayBehavior";
import { SqueakBehavior } from "../QuackBehaviors/SqueakBehavior";
import { Duck } from "./Duck";

export class RubberDuck extends Duck {
  constructor() {
    super(new FlyNoWayBehavior(), new SqueakBehavior(), new NoDanceBehavior());
  }

  public display(): void {
    console.log("*Rubber Duck displayed*");
  }
}
