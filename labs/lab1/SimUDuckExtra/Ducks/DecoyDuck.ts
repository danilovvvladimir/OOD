import { NoDanceBehavior } from "../DanceBehaviors/NoDanceBehavior";
import { FlyNoWayBehavior } from "../FlyBehaviors/FlyNoWayBehavior";
import { MuteQuackBehavior } from "../QuackBehaviors/MuteQuackBehavior";
import { Duck } from "./Duck";

export class DecoyDuck extends Duck {
  constructor() {
    super(
      new FlyNoWayBehavior(),
      new MuteQuackBehavior(),
      new NoDanceBehavior(),
    );
  }

  public display(): void {
    console.log("*Decoy duck displayed*");
  }
}
