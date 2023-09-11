import { flyNoWay } from "../flyBehaviors";
import { squeak } from "../quackBehaviors";
import { danceNoWay } from "../danceBehaviors";
import { Duck } from "./Duck";

export class MallardDuck extends Duck {
  constructor() {
    super(flyNoWay, squeak, danceNoWay);
  }

  public display(): void {
    console.log("*Rubber Duck displayed*");
  }
}
