import { MallardDuck } from "./Ducks/MallardDuck";
import { RedHeadDuck } from "./Ducks/RedHeadDuck";
import { FlyNoWayBehavior } from "./FlyBehaviors/FlyNoWayBehavior";

// 3 раза должно вывестись состояние полёта
const redHeadDuck = new RedHeadDuck();
redHeadDuck.fly();
redHeadDuck.fly();
redHeadDuck.fly();
redHeadDuck.setFlyBehavior(new FlyNoWayBehavior());
redHeadDuck.fly();

// 0 раз должно вывестись состояние полёта
const mallardDuck = new MallardDuck();
mallardDuck.setFlyBehavior(new FlyNoWayBehavior());
mallardDuck.fly();
mallardDuck.fly();
