import IGumballMachine from "../GumballMachine/IGumballMachine";
import IState from "./IState";

class SoldState implements IState {
  private gumballMachine: IGumballMachine;

  constructor(gumballMachine: IGumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  public insertQuarter(): void {
    console.log("Please wait, we're already giving you a gumball");
  }

  public ejectQuarter(): void {
    console.log("Sorry, you already turned the crank");
  }

  public turnCrank(): void {
    console.log("Turning twice doesn't get you another gumball");
  }

  public dispense(): void {
    this.gumballMachine.releaseBall();

    if (this.gumballMachine.getGumballsCount() === 0) {
      console.log("Oops, out of gumballs");
      this.gumballMachine.setSoldOutState();
    } else {
      if (this.gumballMachine.getQuartersCount() !== 0) {
        this.gumballMachine.setHasQuarterState();
      } else {
        this.gumballMachine.setNoQuarterState();
      }
    }
  }

  public refill(gumballsCount: number): void {
    console.log(
      "Can not change number of gumballs's while delivering a gumball",
    );
  }

  public toString(): string {
    return "delivering a gumball";
  }
}

export default SoldState;
