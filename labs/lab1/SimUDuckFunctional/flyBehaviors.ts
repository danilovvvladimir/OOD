export type FlyBehavior = () => void;

export const flyNoWay: FlyBehavior = () => {};

export const createFlyWithWingsBehavior = (): FlyBehavior => {
  let flightsCount = 0;

  return () => {
    console.log(
      `Oh.. man.. that's my ${++flightsCount} flight, i feel excited!`,
    );
  };
};
