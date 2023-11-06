import IGumballMachine from "../GumballMachine/IGumballMachine";
import IState from "./IState";

class SoldOutState implements IState {
  private gumballMachine: IGumballMachine;

  constructor(gumballMachine: IGumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter(): void {
    console.log("You can't insert a quarter, the machine is sold out");
  }

  ejectQuarter(): void {
    if (this.gumballMachine.getQuartersCount() !== 0) {
      console.log("Quarters ejected");
      this.gumballMachine.resetQuarters();
    } else {
      console.log("You can't eject, you haven't inserted a quarter yet");
    }
  }

  turnCrank(): void {
    console.log("You turned but there's no gumballs");
  }

  dispense(): void {
    console.log("No gumball dispensed");
  }

  toString(): string {
    return "sold out";
  }
}

export default SoldOutState;
