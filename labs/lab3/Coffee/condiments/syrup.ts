import { IBeverage } from "../beverages/beverage";
import { CondimentDecorator } from "./condimentDecorator";

export enum SyrupType {
  CHOCOLATE = "Chocolate",
  MAPLE = "Maple",
}

export class Syrup extends CondimentDecorator {
  private syrupType: SyrupType;

  constructor(beverage: IBeverage, syrupType: SyrupType) {
    super(beverage);
    this.syrupType = syrupType;
  }

  public getCondimentDescription(): string {
    return `${
      this.syrupType === SyrupType.CHOCOLATE ? "Chocolate" : "Maple"
    } syrup`;
  }

  public getCondimentCost(): number {
    return 15;
  }
}
