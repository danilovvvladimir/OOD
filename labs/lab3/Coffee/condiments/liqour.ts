import { IBeverage } from "../beverages/beverage";
import { CondimentDecorator } from "./condimentDecorator";

export enum LiqourType {
  CHOCOLATE = "Chocolate",
  NUTTY = "Nutty",
}

export class Liqour extends CondimentDecorator {
  private liqourType: LiqourType;

  constructor(beverage: IBeverage, liqourType: LiqourType) {
    super(beverage);
    this.liqourType = liqourType;
  }

  public getCondimentDescription(): string {
    return `${
      this.liqourType === LiqourType.CHOCOLATE ? "Chocolate" : "Nutty"
    } liqour`;
  }

  public getCondimentCost(): number {
    return 50;
  }
}
