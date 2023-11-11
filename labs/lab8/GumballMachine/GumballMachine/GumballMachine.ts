import HasQuarterState from "../States/HasQuarterState";
import IState from "../States/IState";
import NoQuarterState from "../States/NoQuarterState";
import SoldOutState from "../States/SoldOutState";
import SoldState from "../States/SoldState";
import IGumballMachine from "./IGumballMachine";

class GumballMachine implements IGumballMachine {
  private gumballsCount: number = 0;
  private currentState: IState;

  constructor(numBalls: number) {
    this.gumballsCount = numBalls;

    if (numBalls < 0) {
      throw new Error("Balls count can not be negative number");
    }

    if (this.gumballsCount > 0) {
      this.setNoQuarterState();
    } else {
      this.setSoldOutState();
    }
  }

  public ejectQuarter(): void {
    this.currentState.ejectQuarter();
  }

  public insertQuarter(): void {
    this.currentState.insertQuarter();
  }

  public turnCrank(): void {
    this.currentState.turnCrank();
    this.currentState.dispense();
  }

  public toString(): string {
    return `Mighty Gumball, Inc.\nTypescript-enabled Standing Gumball Model #2023 (with state)\nInventory: ${
      this.gumballsCount
    } gumball${
      this.gumballsCount !== 1 ? "s" : ""
    }\nMachine is ${this.currentState.toString()}\n`;
  }

  public setSoldOutState(): void {
    this.currentState = new SoldOutState(this);
  }

  public setNoQuarterState(): void {
    this.currentState = new NoQuarterState(this);
  }

  public setSoldState(): void {
    this.currentState = new SoldState(this);
  }

  public setHasQuarterState(): void {
    this.currentState = new HasQuarterState(this);
  }

  public releaseBall(): void {
    if (this.gumballsCount > 0) {
      console.log("A gumball comes rolling out the slot...");
      this.gumballsCount--;
    }
  }

  public getGumballsCount(): number {
    return this.gumballsCount;
  }
}

export default GumballMachine;
