import IGumballMachine from "../GumballMachine/IGumballMachine";
import IState from "./IState";

class HasQuarterState implements IState {
  private gumballMachine: IGumballMachine;

  constructor(gumballMachine: IGumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter(): void {
    console.log("You can't insert another one quarter");
  }

  ejectQuarter(): void {
    console.log("Quarter ejected successfully");
    this.gumballMachine.setNoQuarterState();
  }

  turnCrank(): void {
    console.log("You turned the crank");
    this.gumballMachine.setSoldState();
  }

  dispense(): void {
    console.log("You need to insert a quarter first");
  }

  toString(): string {
    return "waiting for turning the crank";
  }
}

export default HasQuarterState;
