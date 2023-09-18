import { Writable } from "stream";
import { IObservable } from "../observable/observable";
import { WeatherData, WeatherInfo } from "../observable/weatherData";
import { IObserver } from "../observers/IObserver";

class TestPriorityeDisplay implements IObserver<WeatherInfo> {
  private outputStream: NodeJS.WriteStream;
  private name: string;

  constructor(name: string, outputStream: NodeJS.WriteStream) {
    this.outputStream = outputStream;
    this.name = name;
  }

  public update(data: WeatherInfo): void {
    this.outputStream.write(this.name + "\n");
  }
}

test("TestPriorityeDisplay will be called in foreseen order", () => {
  const weatherData = new WeatherData();

  const firstDisplay = new TestPriorityeDisplay("100", process.stdout);
  const secondDisplay = new TestPriorityeDisplay("50", process.stdout);
  const thirdDisplay = new TestPriorityeDisplay("1", process.stdout);

  weatherData.registerObserver(firstDisplay, 100);
  weatherData.registerObserver(secondDisplay, 50);
  weatherData.registerObserver(thirdDisplay, 1);

  const writeMock = jest.spyOn(process.stdout, "write").mockImplementation();

  weatherData.setMeasurements(10, 0.7, 760);

  expect(writeMock).toHaveBeenCalledWith("100\n");
  expect(writeMock).toHaveBeenCalledWith("50\n");
  expect(writeMock).toHaveBeenCalledWith("1\n");

  writeMock.mockRestore();
});
