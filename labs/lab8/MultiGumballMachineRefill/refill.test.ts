import GumballMachine from "./GumballMachine/GumballMachine";

describe("Testing GumballMachine's refill", () => {
  const log = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = log;
  });

  test("Refill empty machine", () => {
    const gumballMachine = new GumballMachine(0);
    const newGumballsCount: number = 18;

    gumballMachine.refill(newGumballsCount);

    console.log(gumballMachine.toString());

    const expectedBallsCountChangeString =
      "Gumballs count has been successfully changed";

    const expectedStateString = `Mighty Gumball, Inc.
Typescript-enabled Standing Gumball Model #2023 (with state)
Inventory: ${newGumballsCount} gumballs
Quarters: 0 
Machine is waiting for quarter
                `.trim();

    const receivedBallsCountChangeString = (
      console.log as jest.Mock
    ).mock.calls[0][0].trim();
    const receivedStateString = (
      console.log as jest.Mock
    ).mock.calls[1][0].trim();

    expect(receivedBallsCountChangeString).toBe(expectedBallsCountChangeString);
    expect(expectedStateString).toBe(receivedStateString);
  });
  // проверить классы состояний
  test("Refill machine, that already have gumballs", () => {
    const gumballMachine = new GumballMachine(3);
    const newGumballsCount: number = 18;

    gumballMachine.refill(newGumballsCount);

    console.log(gumballMachine.toString());

    const expectedBallsCountChangeString =
      "Gumballs count has been successfully changed";

    const expectedStateString = `Mighty Gumball, Inc.
Typescript-enabled Standing Gumball Model #2023 (with state)
Inventory: ${newGumballsCount} gumballs
Quarters: 0 
Machine is waiting for quarter
                `.trim();

    const receivedBallsCountChangeString = (
      console.log as jest.Mock
    ).mock.calls[0][0].trim();
    const receivedStateString = (
      console.log as jest.Mock
    ).mock.calls[1][0].trim();

    expect(receivedBallsCountChangeString).toBe(expectedBallsCountChangeString);
    expect(expectedStateString).toBe(receivedStateString);
  });

  test("Make machine sold out and then refill", () => {
    const gumballMachine = new GumballMachine(1);
    gumballMachine.insertQuarter();
    gumballMachine.turnCrank();

    const newGumballsCount: number = 18;

    gumballMachine.refill(newGumballsCount);

    console.log(gumballMachine.toString());

    const expectedBallsCountChangeString =
      "Gumballs count has been successfully changed";

    const expectedStateString = `Mighty Gumball, Inc.
Typescript-enabled Standing Gumball Model #2023 (with state)
Inventory: ${newGumballsCount} gumballs
Quarters: 0 
Machine is waiting for quarter
                `.trim();

    const receivedBallsCountChangeString = (
      console.log as jest.Mock
    ).mock.calls[4][0].trim();
    const receivedStateString = (
      console.log as jest.Mock
    ).mock.calls[5][0].trim();

    expect(receivedBallsCountChangeString).toBe(expectedBallsCountChangeString);
    expect(expectedStateString).toBe(receivedStateString);
  });
});
