import { Coffee } from "./beverages/Coffee/coffee";
import { Latte, LattePortion } from "./beverages/Coffee/latte";
import { MilkShakeSize, Milkshake } from "./beverages/Milkshake/milkshake";
import { Syrup, SyrupType } from "./condiments/syrup";

// const coffee = new Coffee();
// console.log(coffee.getDescription());
// console.log(coffee.getCost());

// const milkshake = new Milkshake(MilkShakeSize.MEDIUM);
// console.log(milkshake.getCost());
// console.log(milkshake.getDescription());

// const latte = new Latte(LattePortion.DOUBLE);
// console.log(latte.getCost());
// console.log(latte.getDescription());

const latteStandartWithChocolateSyrop = new Syrup(
  new Latte(LattePortion.STANDART),
  SyrupType.CHOCOLATE,
);

console.log(latteStandartWithChocolateSyrop.getDescription());
console.log(latteStandartWithChocolateSyrop.getCost());
