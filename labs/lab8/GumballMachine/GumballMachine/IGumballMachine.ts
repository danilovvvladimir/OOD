interface IGumballMachine {
  releaseBall(): void;
  getGumballsCount(): number;

  setSoldOutState(): void;
  setNoQuarterState(): void;
  setSoldState(): void;
  setHasQuarterState(): void;
}

export default IGumballMachine;
