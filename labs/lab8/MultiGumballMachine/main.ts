import GumballMachine from "./StatePattern/GumballMachine/GumballMachine";

function testGumballMachine(gumballMachine: GumballMachine): void {
  console.log(gumballMachine.toString());

  gumballMachine.insertQuarter();

  console.log(gumballMachine.toString());
  gumballMachine.addQuarter();
  gumballMachine.addQuarter();
  // console.log(gumballMachine.toString());

  gumballMachine.turnCrank();
  gumballMachine.turnCrank();
  gumballMachine.turnCrank();
  gumballMachine.turnCrank();

  console.log(gumballMachine.toString());
}

function testGumballMachineWithState(): void {
  const gumballMachine = new GumballMachine(5);
  testGumballMachine(gumballMachine);
}

testGumballMachineWithState();
