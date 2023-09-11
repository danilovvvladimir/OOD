export type DanceBehavior = () => void;

export const danceMinuet: DanceBehavior = () => {
  console.log("I am dancing minuet!");
};

export const danceWaltz: DanceBehavior = () => {
  console.log("I am dancing waltz!");
};

export const danceNoWay: DanceBehavior = () => {};
