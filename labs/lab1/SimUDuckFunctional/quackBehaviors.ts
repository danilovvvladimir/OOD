export type QuackBehavior = () => void;

export const muteQuack: QuackBehavior = () => {};

export const quack: QuackBehavior = () => {
  console.log("Quack Quack!!!");
};

export const squeak: QuackBehavior = () => {
  console.log("Squeek!!!");
};
