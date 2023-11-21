import IGumballMachine from "../GumballMachine/IGumballMachine";
import IState from "./IState";

class NoQuarterState implements IState {
  private gumballMachine: IGumballMachine;

  constructor(gumballMachine: IGumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  public refill(gumballsCount: number): void {
    console.log("Gumballs count has been successfully changed");

    this.gumballMachine.setGumballsCount(gumballsCount);

    if (gumballsCount <= 0) {
      // исправить проверку
      this.gumballMachine.setSoldOutState();
    }
  }

  public insertQuarter(): void {
    console.log("You inserted a quarter");

    this.gumballMachine.addQuarter();
    this.gumballMachine.setHasQuarterState();
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
