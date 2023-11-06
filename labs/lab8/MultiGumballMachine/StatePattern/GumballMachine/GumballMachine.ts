import HasQuarterState from "../States/HasQuarterState";
import IState from "../States/IState";
import NoQuarterState from "../States/NoQuarterState";
import SoldOutState from "../States/SoldOutState";
import SoldState from "../States/SoldState";
import IGumballMachine from "./IGumballMachine";

class GumballMachine implements IGumballMachine {
  private count: number = 0;
  private currentState: IState;
  private quartersCount: number = 0;
  private readonly QUARTERS_LIMIT: number = 5;

  constructor(numBalls: number) {
    this.count = numBalls;

    if (numBalls < 0) {
      throw new Error("Balls count can not be negative number");
    }

    if (this.count > 0) {
      this.setNoQuarterState();
    } else {
      this.setSoldOutState();
    }
  }

  getQuartersLimit(): number {
    return this.QUARTERS_LIMIT;
  }

  addQuarter(): void {
    if (this.quartersCount === this.QUARTERS_LIMIT) {
      console.log(
        `Can not add quarter, because of limit of quarters(${this.QUARTERS_LIMIT})`,
      );
    } else {
      this.quartersCount++;
    }
  }

  removeQuarter(): void {
    if (this.quartersCount === 0) {
      console.log("Can not remove quarter, because there is no quarters");
    } else {
      this.quartersCount--;
    }
  }

  resetQuarters(): void {
    this.quartersCount = 0;
  }

  getQuartersCount(): number {
    return this.quartersCount;
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
