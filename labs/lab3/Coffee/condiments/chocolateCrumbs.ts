import { IBeverage } from "../beverages/beverage";
import { CondimentDecorator } from "./condimentDecorator";

export class ChocolateCrumbs extends CondimentDecorator {
  private mass: number;

  constructor(beverage: IBeverage, mass: number = 1) {
    if (mass < 1) {
      throw new Error("You can't add negative grams of Chocolate Crumbs");
    }

    super(beverage);
    this.mass = mass;
  }

  public getCondimentDescription(): string {
    return `Chocolate  flakes ${this.mass} g.`;
  }

  public getCondimentCost(): number {
    return 2 * this.mass;
  }
}
