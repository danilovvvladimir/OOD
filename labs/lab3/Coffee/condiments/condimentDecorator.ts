import { IBeverage } from "../beverages/beverage";

export abstract class CondimentDecorator implements IBeverage {
  private beverage: IBeverage;

  public getDescription(): string {
    return `${this.beverage.getDescription()}, ${this.getCondimentDescription()}`;
  }

  public getCost(): number {
    return this.beverage.getCost() + this.getCondimentCost();
  }

  public abstract getCondimentDescription(): string;
  public abstract getCondimentCost(): number;

  protected constructor(beverage: IBeverage) {
    this.beverage = beverage;
  }
}
