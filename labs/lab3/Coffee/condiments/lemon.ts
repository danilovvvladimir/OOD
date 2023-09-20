import { IBeverage } from "../beverages/beverage";
import { CondimentDecorator } from "./condimentDecorator";

export class Lemon extends CondimentDecorator {
  private quantity: number;

  constructor(beverage: IBeverage, quantity: number = 1) {
    if (quantity < 1) {
      throw new Error("You can't add negative amount of Lemon");
    }

    super(beverage);
    this.quantity = quantity;
  }

  public getCondimentDescription(): string {
    return `Lemon x ${this.quantity}`;
  }

  public getCondimentCost(): number {
    return 10 * this.quantity;
  }
}
