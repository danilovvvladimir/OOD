import { IFlyBehavior } from "./IFlyBehavior";

export class FlyWithWingsBehavior implements IFlyBehavior {
  fly(): void {
    console.log("I'm flying with wings!!");
  }
}
