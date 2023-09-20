import { Beverage } from "../beverage";

export enum MilkShakeSize {
  SMALL = "Small",
  MEDIUM = "Medium",
  BIG = "Big",
}

export class Milkshake extends Beverage {
  private milkShakeDescription: string;
  private cost: number;

  constructor(private size: MilkShakeSize) {
    super("Milkshake");
    switch (this.size) {
      case MilkShakeSize.SMALL:
        this.milkShakeDescription = "Small";
        this.cost = 50;
        break;
      case MilkShakeSize.MEDIUM:
        this.milkShakeDescription = "Medium";
        this.cost = 60;
        break;
      default:
        this.milkShakeDescription = "Big";
        this.cost = 80;
        break;
    }
  }

  public getCost(): number {
    return this.cost;
  }

  public getDescription(): string {
    return `${this.milkShakeDescription} ${super.getDescription()}`;
  }
}
