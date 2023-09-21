import { IBeverage } from "../beverages/beverage";
import { CondimentDecorator } from "./condimentDecorator";

export class Cream extends CondimentDecorator {
  constructor(beverage: IBeverage) {
    super(beverage);
  }

  public getCondimentDescription(): string {
    return "Cream";
  }

  public getCondimentCost(): number {
    return 25;
  }
}
