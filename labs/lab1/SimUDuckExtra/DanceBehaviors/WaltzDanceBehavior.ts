import { IDanceBehavior } from "./IDanceBehavior";

export class WaltzDanceBehavior implements IDanceBehavior {
  dance(): void {
    console.log("I am dancing waltz!");
  }
}
