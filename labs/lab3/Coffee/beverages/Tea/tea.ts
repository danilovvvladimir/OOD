import { Beverage } from "../beverage";

export enum TeaType {
  BLACK = "Black",
  OOLONG = "Oolong",
  PUERH = "Puerh",
  MATCHA = "Matcha",
}

export class Tea extends Beverage {
  private teaDescription: string;

  constructor(teaType: TeaType) {
    super("Tea");

    switch (teaType) {
      case TeaType.BLACK:
        this.teaDescription = "Black";
        break;
      case TeaType.OOLONG:
        this.teaDescription = "Oolong";
        break;
      case TeaType.PUERH:
        this.teaDescription = "Puerh";
        break;
      case TeaType.MATCHA:
        this.teaDescription = "Matcha";
        break;
    }
  }

  public getCost(): number {
    return 30;
  }

  public getDescription(): string {
    return `${this.teaDescription} + ${super.getDescription()}`;
  }
}
