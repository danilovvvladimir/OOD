import HasQuarterState from "../States/HasQuarterState";
import IState from "../States/IState";
import NoQuarterState from "../States/NoQuarterState";
import SoldOutState from "../States/SoldOutState";
import SoldState from "../States/SoldState";
import IGumballMachine from "./IGumballMachine";

class GumballMachine implements IGumballMachine {
  private count: number = 0;
  private currentState: IState;

  constructor(numBalls: number) {
    this.count = numBalls;
    if (this.count > 0) {
      this.setNoQuarterState();
    } else {
      this.setSoldOutState();
    }
  }

  ejectQuarter(): void {
    this.currentState.ejectQuarter();
  }

  insertQuarter(): void {
    this.currentState.insertQuarter();
  }

  turnCrank(): void {
    this.currentState.turnCrank();
    this.currentState.dispense();
  }

  toString(): string {
    return `Mighty Gumball, Inc.\nTypescript-enabled Standing Gumball Model #2023 (with state)\nInventory: ${
      this.count
    } gumball${
      this.count !== 1 ? "s" : ""
    }\nMachine is ${this.currentState.toString()}\n`;
  }

  setSoldOutState(): void {
    this.currentState = new SoldOutState(this);
  }

  setNoQuarterState(): void {
    this.currentState = new NoQuarterState(this);
  }

  setSoldState(): void {
    this.currentState = new SoldState(this);
  }

  setHasQuarterState(): void {
    this.currentState = new HasQuarterState(this);
  }

  releaseBall(): void {
    if (this.count > 0) {
      console.log("A gumball comes rolling out the slot...");
      this.count--;
    }
  }

  getBallsCount(): number {
    return this.count;
  }
}

export default GumballMachine;
