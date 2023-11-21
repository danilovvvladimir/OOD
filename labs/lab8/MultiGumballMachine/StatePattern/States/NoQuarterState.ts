import IGumballMachine from "../GumballMachine/IGumballMachine";
import IState from "./IState";

class NoQuarterState implements IState {
  private gumballMachine: IGumballMachine;

  constructor(gumballMachine: IGumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  public insertQuarter(): void {
    //Убрать лишнюю проверку
    if (
      this.gumballMachine.getQuartersCount() ===
      this.gumballMachine.getQuartersLimit()
    ) {
      console.log(
        "You can't insert another quarter. The Limit is " +
          this.gumballMachine.getQuartersLimit(),
      );
    } else {
      console.log("You inserted a quarter");
      this.gumballMachine.addQuarter();
      this.gumballMachine.setHasQuarterState();
    }
  }

  public ejectQuarter(): void {
    console.log("You haven't inserted a quarter");
  }

  public turnCrank(): void {
    console.log("You turned but there's no quarter");
  }

  public dispense(): void {
    console.log("You need to pay first");
  }

  public toString(): string {
    return "waiting for quarter";
  }
}

export default NoQuarterState;
