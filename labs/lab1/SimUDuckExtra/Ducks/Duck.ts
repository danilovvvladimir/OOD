import { IDanceBehavior } from "../DanceBehaviors/IDanceBehavior";
import { IFlyBehavior } from "../FlyBehaviors/IFlyBehavior";
import { IQuackBehavior } from "../QuackBehaviors/IQuackBehavior";

export abstract class Duck {
  constructor(
    private flyBehavior: IFlyBehavior,
    private quackBehavior: IQuackBehavior,
    private danceBehavior: IDanceBehavior,
  ) {}

  public fly(): void {
    this.flyBehavior.fly();
  }

  public quack(): void {
    this.quackBehavior.quack();
  }

  public dance(): void {
    this.danceBehavior.dance();
  }

  public setFlyBehavior(flyBehavior: IFlyBehavior): void {
    this.flyBehavior = flyBehavior;
  }

  public abstract display(): void;
}
