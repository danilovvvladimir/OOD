import { naive } from "./Naive/main";

describe("MultiGumballMachine naive testing", () => {
  const log = console.log;
  let gumballMachine: naive.GumballMachine;

  beforeEach(() => {
    console.log = jest.fn();

    gumballMachine = new naive.GumballMachine(3);
  });

  afterAll(() => {
    console.log = log;
  });

  test("Put 3 quarters in gumball machine in a row", () => {
    gumballMachine.insertQuarter();
    gumballMachine.insertQuarter();
    gumballMachine.insertQuarter();

    console.log(gumballMachine.toString());

    const expectedString = `Mighty Gumball, Inc.
Typescript-enabled Standing Gumball Model #2023 (with state)
Inventory: 3 gumballs
Quarters: 3
Machine is in has quarter state
                `.trim();

    const receivedString = (console.log as jest.Mock).mock.calls[3][0].trim();

    expect(receivedString).toBe(expectedString);
  });

  test("Put 3 quarters and turn the crank 3 times, machine should be sold out after turns", () => {
    gumballMachine.insertQuarter();
    gumballMachine.insertQuarter();
    gumballMachine.insertQuarter();

    gumballMachine.turnCrank();
    gumballMachine.turnCrank();
    gumballMachine.turnCrank();

    console.log(gumballMachine.toString());

    const expectedString = `Mighty Gumball, Inc.
Typescript-enabled Standing Gumball Model #2023 (with state)
Inventory: 0 gumballs
Quarters: 0
Machine is in sold out state
                `.trim();

    const receivedString = (console.log as jest.Mock).mock.calls[10][0].trim();

    expect(receivedString).toBe(expectedString);
  });

  test("Put 3 quarters and bring them back, final quarters in machine should be 0", () => {
    gumballMachine.insertQuarter();
    gumballMachine.insertQuarter();
    gumballMachine.insertQuarter();

    gumballMachine.ejectQuarter();

    console.log(gumballMachine.toString());

    const expectedString = `Mighty Gumball, Inc.
Typescript-enabled Standing Gumball Model #2023 (with state)
Inventory: 3 gumballs
Quarters: 0
Machine is in no quarter state
                `.trim();

    const receivedString = (console.log as jest.Mock).mock.calls[4][0].trim();

    expect(receivedString).toBe(expectedString);
  });

  test("Put more quarters then limit, should not be able to do so", () => {
    const quartersLimit = gumballMachine.getQuartersLimit();

    for (let i = 0; i < quartersLimit + 1; i++) {
      gumballMachine.insertQuarter();
    }

    expect((console.log as jest.Mock).mock.calls[5][0].trim()).toBe(
      "You can't insert another quarter",
    );

    const expectedStateString = `Mighty Gumball, Inc.
Typescript-enabled Standing Gumball Model #2023 (with state)
Inventory: 3 gumballs
Quarters: 5
Machine is in has quarter state
                    `.trim();

    console.log(gumballMachine.toString());

    expect((console.log as jest.Mock).mock.calls[6][0].trim()).toBe(
      expectedStateString,
    );
  });
});
