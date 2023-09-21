import { IBeverage } from "../beverages/beverage";
import { CondimentDecorator } from "./condimentDecorator";

export class Chocolate extends CondimentDecorator {
  private quantity: number;

  constructor(beverage: IBeverage, quantity: number = 1) {
    if (quantity < 1) {
      throw new Error("You can't add negative amount of chocolate");
    }

    if (quantity > 5) {
      throw new Error("You can't add more than 5 chocolate");
    }

    super(beverage);
    this.quantity = quantity;
  }

  public getCondimentDescription(): string {
    return `Chocolate x ${this.quantity}`;
  }

  public getCondimentCost(): number {
    return 10 * this.quantity;
  }
}
