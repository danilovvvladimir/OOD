import { flyNoWay } from "../flyBehaviors";
import { muteQuack } from "../quackBehaviors";
import { danceNoWay } from "../danceBehaviors";
import { Duck } from "./Duck";

export class DecoyDuck extends Duck {
  constructor() {
    super(flyNoWay, muteQuack, danceNoWay);
  }

  public display(): void {
    console.log("*Decoy duck displayed*");
  }
}
