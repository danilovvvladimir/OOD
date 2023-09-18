import { IObservable } from "../observable/observable";
import { WeatherData, WeatherInfo } from "../observable/weatherData";
import { IObserver } from "../observers/IObserver";

class DestructiveObserver implements IObserver<WeatherInfo> {
  private outputStream: NodeJS.WriteStream;
  private observable: IObservable<WeatherInfo>;

  constructor(
    observable: IObservable<WeatherInfo>,
    outputStream: NodeJS.WriteStream,
  ) {
    this.outputStream = outputStream;
    this.observable = observable;
  }

  public update(data: WeatherInfo): void {
    this.observable.removeObserver(this);
    this.outputStream.write(data.temperature + "\n");
  }
}

test("DestructiveObserver won't delete himself in update method", () => {
  const weatherData = new WeatherData();

  const destructiveObserver = new DestructiveObserver(
    weatherData,
    process.stdout,
  );

  weatherData.registerObserver(destructiveObserver, 10);
  const writeMock = jest.spyOn(process.stdout, "write").mockImplementation();

  weatherData.setMeasurements(10, 0.7, 760);
  weatherData.setMeasurements(15, 0.7, 760);

  expect(writeMock).toHaveBeenCalledWith("10\n");
  expect(writeMock).toHaveBeenCalledWith("15\n");

  writeMock.mockRestore();
});
