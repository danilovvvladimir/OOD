interface IGumballMachine {
  releaseBall(): void;
  getBallsCount(): number;

  setSoldOutState(): void;
  setNoQuarterState(): void;
  setSoldState(): void;
  setHasQuarterState(): void;
}

export default IGumballMachine;
