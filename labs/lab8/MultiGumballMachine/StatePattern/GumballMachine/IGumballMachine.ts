interface IGumballMachine {
  addQuarter(): void;
  removeQuarter(): void;
  resetQuarters(): void;
  getQuartersCount(): number;
  getQuartersLimit(): number;

  releaseBall(): void;
  getBallsCount(): number;

  setSoldOutState(): void;
  setNoQuarterState(): void;
  setSoldState(): void;
  setHasQuarterState(): void;
}

export default IGumballMachine;
