export interface IBeverage {
  getDescription(): string;
  getCost(): number;
}

export abstract class Beverage implements IBeverage {
  constructor(private description: string) {}

  public getDescription(): string {
    return this.description;
  }

  public abstract getCost(): number;
}
