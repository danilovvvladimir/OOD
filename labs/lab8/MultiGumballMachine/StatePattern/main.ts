import GumballMachine from "./GumballMachine/GumballMachine";

function testGumballMachine(gumballMachine: GumballMachine): void {
  console.log(gumballMachine.toString());

  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();

  console.log(gumballMachine.toString());

  gumballMachine.insertQuarter();
  gumballMachine.ejectQuarter();
  gumballMachine.turnCrank();

  console.log(gumballMachine.toString());

  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.ejectQuarter();

  console.log(gumballMachine.toString());

  gumballMachine.insertQuarter();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();

  console.log(gumballMachine.toString());
}

function testGumballMachineWithState(): void {
  const gumballMachine = new GumballMachine(5);
  testGumballMachine(gumballMachine);
}

testGumballMachineWithState();
