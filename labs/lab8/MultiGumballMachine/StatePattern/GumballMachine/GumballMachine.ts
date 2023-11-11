import HasQuarterState from "../States/HasQuarterState";
import IState from "../States/IState";
import NoQuarterState from "../States/NoQuarterState";
import SoldOutState from "../States/SoldOutState";
import SoldState from "../States/SoldState";
import IGumballMachine from "./IGumballMachine";

class GumballMachine implements IGumballMachine {
  private gumballsCount: number = 0;
  private currentState: IState;
  private quartersCount: number = 0;
  private readonly QUARTERS_LIMIT: number = 5;

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

  public getQuartersLimit(): number {
    return this.QUARTERS_LIMIT;
  }

  public addQuarter(): void {
    if (this.quartersCount === this.QUARTERS_LIMIT) {
      console.log(
        `Can not add quarter, because of limit of quarters(${this.QUARTERS_LIMIT})`,
      );
    } else {
      this.quartersCount++;
    }
  }

  public removeQuarter(): void {
    if (this.quartersCount === 0) {
      console.log("Can not remove quarter, because there is no quarters");
    } else {
      this.quartersCount--;
    }
  }

  public resetQuarters(): void {
    this.quartersCount = 0;
  }

  public getQuartersCount(): number {
    return this.quartersCount;
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

  public releaseBall(): void {
    if (this.gumballsCount > 0) {
      console.log("A gumball comes rolling out the slot...");
      this.gumballsCount--;
    }
  }

  public getGumballsCount(): number {
    return this.gumballsCount;
  }

  public toString(): string {
    return `Mighty Gumball, Inc.\nTypescript-enabled Standing Gumball Model #2023 (with state)\nInventory: ${
      this.gumballsCount
    } gumball${this.gumballsCount !== 1 ? "s" : ""}\nQuarters: ${
      this.quartersCount
    }\nMachine is ${this.currentState.toString()}\n`;
  }
}

export default GumballMachine;
