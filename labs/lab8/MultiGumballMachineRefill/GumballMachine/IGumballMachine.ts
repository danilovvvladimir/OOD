interface IGumballMachine {
  addQuarter(): void;
  removeQuarter(): void;
  resetQuarters(): void;
  getQuartersCount(): number;
  getQuartersLimit(): number;

  releaseBall(): void;
  getGumballsCount(): number;

  setSoldOutState(): void;
  setNoQuarterState(): void;
  setSoldState(): void;
  setHasQuarterState(): void;

  setGumballsCount(gumballsCount: number): void;
}

export default IGumballMachine;
