import { Beverage } from "../beverage";

export class Coffee extends Beverage {
  constructor(description: string = "Coffee") {
    super(description);
  }

  public getCost(): number {
    return 60;
  }
}
