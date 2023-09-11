import { DecoyDuck } from "./Ducks/DecoyDuck";
import { MallardDuck } from "./Ducks/MallardDuck";
import { RedHeadDuck } from "./Ducks/RedHeadDuck";
import { FlyNoWayBehavior } from "./FlyBehaviors/FlyNoWayBehavior";

const decoyDuck = new DecoyDuck();
decoyDuck.display();
decoyDuck.dance();

const redHeadDuck = new RedHeadDuck();
redHeadDuck.display();
redHeadDuck.dance();
redHeadDuck.quack();
redHeadDuck.fly();
redHeadDuck.setFlyBehavior(new FlyNoWayBehavior());
redHeadDuck.fly();

const mallardDuck = new MallardDuck();
mallardDuck.display();
mallardDuck.dance();
mallardDuck.quack();
mallardDuck.fly();
