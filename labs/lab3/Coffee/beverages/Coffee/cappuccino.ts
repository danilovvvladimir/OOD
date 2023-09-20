import { Coffee } from "./coffee";

export enum CappuccinoPortion {
  STANDART = "Standart",
  DOUBLE = "Double",
}

export class Cappuccino extends Coffee {
  private cappuccinoDescription: string;
  private cost: number;

  constructor(cappuccinoPortion: CappuccinoPortion) {
    super("Cappuccino");
    switch (cappuccinoPortion) {
      case CappuccinoPortion.DOUBLE:
        this.cappuccinoDescription = "Double";
        this.cost = 120;
        break;
      default:
        this.cappuccinoDescription = "Standart";
        this.cost = 80;
        break;
    }
  }

  public getCost(): number {
    return this.cost;
  }

  public getDescription(): string {
    return `${this.cappuccinoDescription} ${super.getDescription()}`;
  }
}
