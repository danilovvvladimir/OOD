import { RedHeadDuck } from "./Ducks/RedHeadDuck";
import { flyNoWay } from "./flyBehaviors";

const redHeadDuck = new RedHeadDuck();
redHeadDuck.fly();
redHeadDuck.fly();
redHeadDuck.setFlyBehavior(flyNoWay);
redHeadDuck.fly();
