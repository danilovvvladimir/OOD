import GumballMachine from "./GumballMachine";
import IGumballMachine from "./IGumballMachine";

describe("GumballMachine negative cases", () => {
  const log = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = log;
  });

  test("Gumball machine with negative count of balls, soldOutState throws error", () => {
    expect(() => new GumballMachine(-1)).toThrowError(
      "Balls count can not be negative number",
    );
  });
});

describe("GumballMachine empty balls", () => {
  const log = console.log;
  let gumballMachine: GumballMachine;

  beforeEach(() => {
    console.log = jest.fn();
    gumballMachine = new GumballMachine(0);
  });

  afterAll(() => {
    console.log = log;
  });

  test("Gumball machine with 0 balls, hasQuarterState gumball machine should call console log 0 times", () => {
    gumballMachine.setHasQuarterState();

    gumballMachine.releaseBall();
    // тестировать что именно вывела
    expect(console.log).toBeCalledTimes(0);
  });

  test("Gumball machine with 0 balls, noQuarterState should call console log 0 times", () => {
    gumballMachine.setNoQuarterState();

    gumballMachine.releaseBall();

    expect(console.log).toBeCalledTimes(0);
  });

  test("Gumball machine with 0 balls, soldOutState should call console log 0 times", () => {
    gumballMachine.setSoldOutState();

    gumballMachine.releaseBall();

    expect(console.log).toBeCalledTimes(0);
  });

  test("Gumball machine with 0 balls, soldState should call console log 0 times", () => {
    gumballMachine.setSoldState();

    gumballMachine.releaseBall();

    expect(console.log).toBeCalledTimes(0);
  });
});

describe("Testing releaseGum on gumball machine with 1 ball", () => {
  const log = console.log;
  let gumballMachine;

  beforeEach(() => {
    console.log = jest.fn();
    gumballMachine = new GumballMachine(1);
  });

  afterAll(() => {
    console.log = log;
  });

  test("hasQuarterState should call console log 1 times", () => {
    gumballMachine.setHasQuarterState();
    gumballMachine.releaseBall();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "A gumball comes rolling out the slot...",
    );
  });

  test("noQuarterState should call console log 1 times", () => {
    gumballMachine.setNoQuarterState();
    gumballMachine.releaseBall();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "A gumball comes rolling out the slot...",
    );
  });

  test("soldOutState should call console log 1 times", () => {
    gumballMachine.setSoldOutState();
    gumballMachine.releaseBall();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "A gumball comes rolling out the slot...",
    );
  });

  test("soldState should call console log 1 times", () => {
    gumballMachine.setSoldState();
    gumballMachine.releaseBall();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "A gumball comes rolling out the slot...",
    );
  });
});

describe("Testing state changing", () => {
  const log = console.log;
  let gumballMachine: IGumballMachine;

  beforeEach(() => {
    console.log = jest.fn();
    gumballMachine = new GumballMachine(1);
  });

  afterAll(() => {
    console.log = log;
  });

  test("Testing setSoldOutState on gumballMachine should change its state to soldOut", () => {
    gumballMachine.setSoldOutState();

    console.log(gumballMachine.toString());

    expect(console.log).toBeCalledTimes(1);

    const expectedString = `Mighty Gumball, Inc.
Typescript-enabled Standing Gumball Model #2023 (with state)
Inventory: 1 gumball
Machine is sold out
    `.trim();

    const receivedString = (console.log as jest.Mock).mock.calls[0][0].trim();

    expect(receivedString).toBe(expectedString);
  });

  test("Testing setNoQuarterState on gumballMachine should change its state to noQuarter", () => {
    gumballMachine.setNoQuarterState();

    console.log(gumballMachine.toString());

    expect(console.log).toBeCalledTimes(1);

    const expectedString = `Mighty Gumball, Inc.
Typescript-enabled Standing Gumball Model #2023 (with state)
Inventory: 1 gumball
Machine is waiting for quarter
        `.trim();

    const receivedString = (console.log as jest.Mock).mock.calls[0][0].trim();

    expect(receivedString).toBe(expectedString);
  });

  test("Testing setSoldState on gumballMachine should change its state to sold", () => {
    gumballMachine.setSoldState();

    console.log(gumballMachine.toString());

    expect(console.log).toBeCalledTimes(1);

    const expectedString = `Mighty Gumball, Inc.
Typescript-enabled Standing Gumball Model #2023 (with state)
Inventory: 1 gumball
Machine is delivering a gumball
            `.trim();

    const receivedString = (console.log as jest.Mock).mock.calls[0][0].trim();

    expect(receivedString).toBe(expectedString);
  });

  test("Testing setHasQuarterState on gumballMachine should change its state to hasQuarter", () => {
    gumballMachine.setHasQuarterState();

    console.log(gumballMachine.toString());

    expect(console.log).toBeCalledTimes(1);
    const expectedString = `Mighty Gumball, Inc.
Typescript-enabled Standing Gumball Model #2023 (with state)
Inventory: 1 gumball
Machine is waiting for turning the crank
                `.trim();

    const receivedString = (console.log as jest.Mock).mock.calls[0][0].trim();

    expect(receivedString).toBe(expectedString);
  });
});

describe("GumballMachine getGumballsCount cases", () => {
  test("getGumballsCount on gumball machine with 0 balls should return 0", () => {
    const gumballMachine: GumballMachine = new GumballMachine(0);

    expect(gumballMachine.getGumballsCount()).toBe(0);
  });

  test("getGumballsCount on gumball machine with 5 balls should return 5", () => {
    const gumballMachine: GumballMachine = new GumballMachine(5);

    expect(gumballMachine.getGumballsCount()).toBe(5);
  });
});

describe("Testing ejectQuarter GumballMachine", () => {
  const log = console.log;
  let gumballMachine: GumballMachine;

  beforeEach(() => {
    console.log = jest.fn();
    gumballMachine = new GumballMachine(0);
  });

  afterAll(() => {
    console.log = log;
  });

  test("Testing ejectQuarter on gumballMachine with count = 0, state = hasQuarterState should return quarter", () => {
    gumballMachine.setHasQuarterState();

    gumballMachine.ejectQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "Quarter ejected successfully",
    );
  });

  test("Testing ejectQuarter on gumballMachine with count = 0, state = noQuarterState should print failure message", () => {
    gumballMachine.setNoQuarterState();

    gumballMachine.ejectQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You haven't inserted a quarter",
    );
  });

  test("Testing ejectQuarter on gumballMachine with count = 0, state = soldOutState should print failure message", () => {
    gumballMachine.setSoldOutState();

    gumballMachine.ejectQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You can't eject, you haven't inserted a quarter yet",
    );
  });

  test("Testing ejectQuarter on gumballMachine with count = 0, state = soldState should print failure message", () => {
    gumballMachine.setSoldState();

    gumballMachine.ejectQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "Sorry, you already turned the crank",
    );
  });

  test("Testing ejectQuarter on gumballMachine with count = 1, state = hasQuarterState should return quarter", () => {
    const gumballMachine: GumballMachine = new GumballMachine(1);
    gumballMachine.setHasQuarterState();

    gumballMachine.ejectQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "Quarter ejected successfully",
    );
  });

  test("Testing ejectQuarter on gumballMachine with count = 1, state = noQuarterState should print failure message", () => {
    const gumballMachine: GumballMachine = new GumballMachine(1);
    gumballMachine.setNoQuarterState();

    gumballMachine.ejectQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You haven't inserted a quarter",
    );
  });

  test("Testing ejectQuarter on gumballMachine with count = 1, state = soldOutState should print failure message", () => {
    const gumballMachine: GumballMachine = new GumballMachine(1);
    gumballMachine.setSoldOutState();

    gumballMachine.ejectQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You can't eject, you haven't inserted a quarter yet",
    );
  });

  test("Testing ejectQuarter on gumballMachine with count = 1, state = soldState should print failure message", () => {
    const gumballMachine: GumballMachine = new GumballMachine(1);
    gumballMachine.setSoldState();

    gumballMachine.ejectQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "Sorry, you already turned the crank",
    );
  });
});

describe("Testing insertQuarter GumballMachine", () => {
  const log = console.log;
  let gumballMachine: GumballMachine;

  beforeEach(() => {
    console.log = jest.fn();
    gumballMachine = new GumballMachine(0);
  });

  afterAll(() => {
    console.log = log;
  });

  test("Testing insertQuarter on gumballMachine with count = 0, state = hasQuarterState should print failure message", () => {
    gumballMachine.setHasQuarterState();

    gumballMachine.insertQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You can't insert another one quarter",
    );
  });

  test("Testing insertQuarter on gumballMachine with count = 0, state = noQuarterState should print success message", () => {
    gumballMachine.setNoQuarterState();

    gumballMachine.insertQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You inserted a quarter",
    );
  });

  test("Testing insertQuarter on gumballMachine with count = 0, state = soldOutState should print failure message", () => {
    gumballMachine.setSoldOutState();

    gumballMachine.insertQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You can't insert a quarter, the machine is sold out",
    );
  });

  test("Testing insertQuarter on gumballMachine with count = 0, state = soldState should print failure message", () => {
    gumballMachine.setSoldState();

    gumballMachine.insertQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "Please wait, we're already giving you a gumball",
    );
  });

  test("Testing insertQuarter on gumballMachine with count = 1, state = hasQuarterState should print failure message", () => {
    const gumballMachine: GumballMachine = new GumballMachine(1);
    gumballMachine.setHasQuarterState();

    gumballMachine.insertQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You can't insert another one quarter",
    );
  });

  test("Testing insertQuarter on gumballMachine with count = 1, state = noQuarterState should print success message", () => {
    const gumballMachine: GumballMachine = new GumballMachine(1);
    gumballMachine.setNoQuarterState();

    gumballMachine.insertQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You inserted a quarter",
    );
  });

  test("Testing insertQuarter on gumballMachine with count = 1, state = soldOutState should print failure message", () => {
    const gumballMachine: GumballMachine = new GumballMachine(1);
    gumballMachine.setSoldOutState();

    gumballMachine.insertQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You can't insert a quarter, the machine is sold out",
    );
  });

  test("Testing insertQuarter on gumballMachine with count = 1, state = soldState should print failure message", () => {
    const gumballMachine: GumballMachine = new GumballMachine(1);
    gumballMachine.setSoldState();

    gumballMachine.insertQuarter();

    expect(console.log).toBeCalledTimes(1);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "Please wait, we're already giving you a gumball",
    );
  });
});

describe("Testing turnCrank GumballMachine", () => {
  const log = console.log;
  let gumballMachine: GumballMachine;

  beforeEach(() => {
    console.log = jest.fn();
    gumballMachine = new GumballMachine(0);
  });

  afterAll(() => {
    console.log = log;
  });

  test("Testing turnCrank on gumballMachine with count = 0, state = hasQuarterState should print success message", () => {
    gumballMachine.setHasQuarterState();

    gumballMachine.turnCrank();

    expect(console.log).toBeCalledTimes(2);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You turned the crank",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "Oops, out of gumballs",
    );
  });

  test("Testing turnCrank on gumballMachine with count = 0, state = noQuarterState should print failure message", () => {
    gumballMachine.setNoQuarterState();

    gumballMachine.turnCrank();

    expect(console.log).toBeCalledTimes(2);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You turned but there's no quarter",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "You need to pay first",
    );
  });

  test("Testing turnCrank on gumballMachine with count = 0, state = soldOutState should print failure message", () => {
    gumballMachine.setSoldOutState();

    gumballMachine.turnCrank();

    expect(console.log).toBeCalledTimes(2);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You turned but there's no gumballs",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "No gumball dispensed",
    );
  });

  test("Testing turnCrank on gumballMachine with count = 0, state = soldState should print failure message", () => {
    gumballMachine.setSoldState();

    gumballMachine.turnCrank();

    expect(console.log).toBeCalledTimes(2);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "Turning twice doesn't get you another gumball",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "Oops, out of gumballs",
    );
  });

  test("Testing turnCrank on gumballMachine with count = 1, state = hasQuarterState should print success message", () => {
    const gumballMachine: GumballMachine = new GumballMachine(1);
    gumballMachine.setHasQuarterState();

    gumballMachine.turnCrank();

    expect(console.log).toBeCalledTimes(3);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You turned the crank",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "A gumball comes rolling out the slot...",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "Oops, out of gumballs",
    );
  });

  test("Testing turnCrank on gumballMachine with count = 1, state = noQuarterState should print failure message", () => {
    const gumballMachine: GumballMachine = new GumballMachine(1);
    gumballMachine.setNoQuarterState();

    gumballMachine.turnCrank();

    expect(console.log).toBeCalledTimes(2);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You turned but there's no quarter",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "You need to pay first",
    );
  });

  test("Testing turnCrank on gumballMachine with count = 1, state = soldOutState should print failure message", () => {
    const gumballMachine: GumballMachine = new GumballMachine(1);
    gumballMachine.setSoldOutState();

    gumballMachine.turnCrank();

    expect(console.log).toBeCalledTimes(2);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "You turned but there's no gumballs",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "No gumball dispensed",
    );
  });

  test("Testing turnCrank on gumballMachine with count = 1, state = soldState should print failure message", () => {
    const gumballMachine: GumballMachine = new GumballMachine(1);
    gumballMachine.setSoldState();

    gumballMachine.turnCrank();

    expect(console.log).toBeCalledTimes(3);
    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "Turning twice doesn't get you another gumball",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "A gumball comes rolling out the slot...",
    );
    expect((console.log as jest.Mock).mock.calls[2][0]).toBe(
      "Oops, out of gumballs",
    );
  });
});
