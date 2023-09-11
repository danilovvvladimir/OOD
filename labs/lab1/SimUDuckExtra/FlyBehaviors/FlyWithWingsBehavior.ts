import { IFlyBehavior } from "./IFlyBehavior";

export class FlyWithWingsBehavior implements IFlyBehavior {
  fly(): void {
    console.log(
      `Oh.. man.. that's my ${++this.flightsCount} flight, i feel excited!`,
    );
  }

  private flightsCount = 0;
}
