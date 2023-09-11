import { IDanceBehavior } from "./IDanceBehavior";

export class MinuetDanceBehavior implements IDanceBehavior {
  dance(): void {
    console.log("I am dancing minuet!");
  }
}
