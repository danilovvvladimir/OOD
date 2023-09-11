import { createFlyWithWingsBehavior } from "../flyBehaviors";
import { quack } from "../quackBehaviors";
import { danceMinuet } from "../danceBehaviors";
import { Duck } from "./Duck";

export class RedHeadDuck extends Duck {
  constructor() {
    super(createFlyWithWingsBehavior(), quack, danceMinuet);
  }

  public display(): void {
    console.log("*RedHead Duck displayed*");
  }
}
