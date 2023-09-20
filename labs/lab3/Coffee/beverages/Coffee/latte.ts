import { Coffee } from "./coffee";

export enum LattePortion {
  STANDART = "Standart",
  DOUBLE = "Double",
}

export class Latte extends Coffee {
  private latteDescription: string;
  private cost: number;

  constructor(lattePortion: LattePortion) {
    super("Cappuccino");
    switch (lattePortion) {
      case LattePortion.DOUBLE:
        this.latteDescription = "Double";
        this.cost = 130;
        break;
      default:
        this.latteDescription = "Standart";
        this.cost = 90;
        break;
    }
  }

  public getCost(): number {
    return this.cost;
  }

  public getDescription(): string {
    return `${this.latteDescription} ${super.getDescription()}`;
  }
}
