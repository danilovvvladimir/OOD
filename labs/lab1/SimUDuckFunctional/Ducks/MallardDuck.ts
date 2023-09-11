import { createFlyWithWingsBehavior } from "../flyBehaviors";
import { quack } from "../quackBehaviors";
import { danceWaltz } from "../danceBehaviors";
import { Duck } from "./Duck";

export class MallardDuck extends Duck {
  constructor() {
    super(createFlyWithWingsBehavior(), quack, danceWaltz);
  }

  public display(): void {
    console.log("*Mallard Duck displayed*");
  }
}
