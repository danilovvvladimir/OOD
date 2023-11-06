import GumballMachine from "./GumballMachine/GumballMachine";

function testGumballMachine(gumballMachine: GumballMachine): void {
  console.log(gumballMachine.toString());

  gumballMachine.insertQuarter();
  gumballMachine.addQuarter();
  gumballMachine.turnCrank();

  gumballMachine.turnCrank();

  console.log(gumballMachine.toString());

  gumballMachine.refill(150);
  console.log(gumballMachine.toString());
}

function testGumballMachineWithState(): void {
  const gumballMachine = new GumballMachine(1);
  testGumballMachine(gumballMachine);
}

testGumballMachineWithState();
