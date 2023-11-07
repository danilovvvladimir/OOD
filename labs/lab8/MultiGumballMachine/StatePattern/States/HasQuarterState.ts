import IGumballMachine from "../GumballMachine/IGumballMachine";
import IState from "./IState";

class HasQuarterState implements IState {
  private gumballMachine: IGumballMachine;

  constructor(gumballMachine: IGumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  public insertQuarter(): void {
    if (
      this.gumballMachine.getQuartersCount() ===
      this.gumballMachine.getQuartersLimit()
    ) {
      console.log("You can't insert another quarter");
    } else {
      console.log("You inserted another quarter");
      this.gumballMachine.addQuarter();
    }
  }

  public ejectQuarter(): void {
    console.log("Quarters ejected successfully");
    this.gumballMachine.resetQuarters();
    this.gumballMachine.setNoQuarterState();
  }

  public turnCrank(): void {
    if (this.gumballMachine.getQuartersCount() !== 0) {
      console.log("You turned the crank");
      this.gumballMachine.removeQuarter();
      this.gumballMachine.setSoldState();
    }
  }

  public dispense(): void {
    console.log("You need to insert a quarter first");
  }

  public toString(): string {
    return "waiting for turning the crank";
  }
}

export default HasQuarterState;
