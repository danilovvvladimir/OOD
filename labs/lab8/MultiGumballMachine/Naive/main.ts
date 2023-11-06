export namespace naive {
  enum State {
    SoldOut, // Жвачка закончилась
    NoQuarter, // Нет монетки
    HasQuarter, // Есть монетка
    Sold, // Монетка выдана
  }

  export interface IGumballMachine {
    ejectQuarter(): void;
    insertQuarter(): void;
    turnCrank(): void;
    toString(): string;
  }

  export class GumballMachine implements IGumballMachine {
    private gumballsCount: number;
    private quartersCount: number;
    private currentState: State = State.SoldOut;

    private readonly QUARTERS_LIMIT: number = 5;

    constructor(numBalls: number) {
      if (numBalls < 0) {
        throw new Error("Balls count can not be negative number");
      }

      this.gumballsCount = numBalls;
      this.quartersCount = 0;
      this.currentState = numBalls > 0 ? State.NoQuarter : State.SoldOut;
    }

    public insertQuarter(): void {
      switch (this.currentState) {
        case State.SoldOut:
          console.log("You can't insert a quarter, the machine is sold out");
          break;
        case State.NoQuarter:
          console.log("You inserted a quarter");
          this.currentState = State.HasQuarter;
          this.quartersCount = 1;
          break;
        case State.HasQuarter:
          if (this.quartersCount === this.QUARTERS_LIMIT) {
            console.log("You can't insert another quarter");
          } else {
            console.log("You inserted a quarter");
            this.quartersCount++;
          }
          break;
        case State.Sold:
          console.log("Please wait, we're already giving you a gumball");
          break;
      }
    }

    public ejectQuarter(): void {
      switch (this.currentState) {
        case State.HasQuarter:
          console.log("Quarters returned");
          this.currentState = State.NoQuarter;
          this.quartersCount = 0;
          break;
        case State.NoQuarter:
          console.log("You haven't inserted a quarter");
          break;
        case State.Sold:
          console.log("Sorry, you already turned the crank");
          break;
        case State.SoldOut:
          if (this.quartersCount !== 0) {
            console.log("Quarters returned");
            this.quartersCount = 0;
          } else {
            console.log("You can't eject, you haven't inserted a quarter yet");
          }
          break;
      }
    }

    public turnCrank(): void {
      switch (this.currentState) {
        case State.SoldOut:
          console.log("You turned but there's no gumballs");
          break;
        case State.NoQuarter:
          console.log("You turned but there's no quarter");
          break;
        case State.HasQuarter:
          console.log("You turned...");
          this.quartersCount--;
          this.currentState = State.Sold;
          this.dispense();
          break;
        case State.Sold:
          console.log("Turning twice doesn't get you another gumball");
          break;
      }
    }

    public refill(gumsCount: number): void {
      this.gumballsCount = gumsCount;
      this.currentState = gumsCount > 0 ? State.NoQuarter : State.SoldOut;
    }

    toString(): string {
      return `Mighty Gumball, Inc.\nTypescript-enabled Standing Gumball Model #2023 (with state)\nInventory: ${
        this.gumballsCount
      } gumball${
        this.gumballsCount !== 1 ? "s" : ""
      }\nMachine is ${this.currentState.toString()}\n`;
    }

    private dispense(): void {
      switch (this.currentState) {
        case State.Sold:
          console.log("A gumball comes rolling out the slot");
          --this.gumballsCount;
          if (this.gumballsCount == 0) {
            console.log("Oops, out of gumballs");
            this.currentState = State.SoldOut;
          } else {
            if (this.quartersCount !== 0) {
              this.currentState = State.HasQuarter;
            } else {
              this.currentState = State.NoQuarter;
            }
          }
          break;
        case State.NoQuarter:
          console.log("You need to pay first");
          break;
        case State.SoldOut:
        case State.HasQuarter:
          console.log("No gumball dispensed");
          break;
      }
    }
  }
}
