import { IBeverage } from "../beverages/beverage";
import { CondimentDecorator } from "./condimentDecorator";

export class Cinnamon extends CondimentDecorator {
  constructor(beverage: IBeverage) {
    super(beverage);
  }

  public getCondimentDescription(): string {
    return "Cinnamon";
  }

  public getCondimentCost(): number {
    return 20;
  }
}
