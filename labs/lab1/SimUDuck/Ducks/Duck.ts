import { IDanceBehavior } from "../DanceBehaviors/IDanceBehavior";
import { IFlyBehavior } from "../FlyBehaviors/IFlyBehavior";
import { IQuackBehavior } from "../QuackBehaviors/IQuackBehavior";

export class Duck {
  constructor(
    flyBehavior: IFlyBehavior,
    quackBehavior: IQuackBehavior,
    danceBehavior: IDanceBehavior,
  ) {
    this.m_flyBehavior = flyBehavior;
    this.m_quackBehavior = quackBehavior;
    this.m_danceBehavior = danceBehavior;
  }

  public fly(): void {
    this.m_flyBehavior.fly();
  }

  public quack(): void {
    this.m_quackBehavior.quack();
  }

  public dance(): void {
    this.m_danceBehavior.dance();
  }

  public setFlyBehavior(flyBehavior: IFlyBehavior): void {
    this.m_flyBehavior = flyBehavior;
  }

  public display(): void {}

  private m_flyBehavior: IFlyBehavior;
  private m_quackBehavior: IQuackBehavior;
  private m_danceBehavior: IDanceBehavior;
}
