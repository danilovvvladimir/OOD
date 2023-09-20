import { IBeverage } from "../beverages/beverage";
import { CondimentDecorator } from "./condimentDecorator";

export enum IceCubeType {
  DRY = "Dry",
  WATER = "Water",
}

export class IceCube extends CondimentDecorator {
  private quantity: number;
  private type: IceCubeType;

  constructor(
    beverage: IBeverage,
    type: IceCubeType = IceCubeType.WATER,
    quantity: number = 1,
  ) {
    if (quantity < 1) {
      throw new Error("You can't add negative amount of Ice Cubes");
    }

    super(beverage);
    this.quantity = quantity;
    this.type = type;
  }

  public getCondimentDescription(): string {
    return `${this.type === IceCubeType.DRY ? "Dry" : "Water"} ice cubes x ${
      this.quantity
    }`;
  }

  public getCondimentCost(): number {
    return (this.type === IceCubeType.DRY ? 10 : 5) * this.quantity;
  }
}
