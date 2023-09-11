import { FlyBehavior } from "../flyBehaviors";
import { QuackBehavior } from "../quackBehaviors";
import { DanceBehavior } from "../danceBehaviors";

export abstract class Duck {
  constructor(
    private flyBehavior: FlyBehavior,
    private quackBehavior: QuackBehavior,
    private danceBehavior: DanceBehavior,
  ) {}

  public fly(): void {
    this.flyBehavior();
  }

  public quack(): void {
    this.quackBehavior();
  }

  public dance(): void {
    this.danceBehavior();
  }

  public setFlyBehavior(flyBehavior: FlyBehavior): void {
    this.flyBehavior = flyBehavior;
  }

  public abstract display(): void;
}
