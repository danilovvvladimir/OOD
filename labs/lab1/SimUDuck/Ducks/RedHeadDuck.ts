import { MinuetDanceBehavior } from "../DanceBehaviors/MinuetDanceBehavior";
import { FlyWithWingsBehavior } from "../FlyBehaviors/FlyWithWingsBehavior";
import { QuackBehavior } from "../QuackBehaviors/QuackBehavior";
import { Duck } from "./Duck";

export class RedHeadDuck extends Duck {
  constructor() {
    super(
      new FlyWithWingsBehavior(),
      new QuackBehavior(),
      new MinuetDanceBehavior(),
    );
  }

  public display(): void {
    console.log("*RedHead Duck displayed*");
  }
}
