import { IBeverage } from "../beverages/beverage";
import { CondimentDecorator } from "./condimentDecorator";

export class CoconutFlakes extends CondimentDecorator {
  private mass: number;

  constructor(beverage: IBeverage, mass: number = 1) {
    if (mass < 1) {
      throw new Error("You can't add negative grams of Coconut Flakes");
    }

    super(beverage);
    this.mass = mass;
  }

  public getCondimentDescription(): string {
    return `Coconut flakes ${this.mass} g.`;
  }

  public getCondimentCost(): number {
    return 1 * this.mass;
  }
}
