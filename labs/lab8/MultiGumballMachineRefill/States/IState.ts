interface IState {
  insertQuarter(): void;
  ejectQuarter(): void;
  turnCrank(): void;
  dispense(): void;
  toString(): string;

  refill(gumballsCount: number): void;
}

export default IState;
