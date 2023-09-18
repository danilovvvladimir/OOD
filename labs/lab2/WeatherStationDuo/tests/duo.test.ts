import { WeatherData } from "../observable/weatherData";
import { Display } from "../observers/displays/display";

test("Display will duo", () => {
  const weatherDataIn = new WeatherData();
  const weatherDataOut = new WeatherData();

  const display = new Display(weatherDataIn, weatherDataOut, process.stdout);

  weatherDataIn.registerObserver(display, 100);
  weatherDataOut.registerObserver(display, 50);

  const writeMock = jest.spyOn(process.stdout, "write").mockImplementation();

  weatherDataIn.setMeasurements(10, 0.7, 760);
  weatherDataIn.setMeasurements(15, 0.7, 760);
  weatherDataOut.setMeasurements(-10, 0.7, 760);

  const firstOutput = [
    "=== CStatsDisplay info ===\n",
    "Position: IN\n",
    "Current Tempetarute: 10\n",
    "Current Humidity: 0.7\n",
    "Current Pressure: 760\n",
    "-----------\n",
  ];

  firstOutput.forEach((line, index) => {
    expect(writeMock).toHaveBeenNthCalledWith(index + 1, line);
  });

  const secondOutput = [
    "=== CStatsDisplay info ===\n",
    "Position: IN\n",
    "Current Tempetarute: 15\n",
    "Current Humidity: 0.7\n",
    "Current Pressure: 760\n",
    "-----------\n",
  ];

  secondOutput.forEach((line, index) => {
    expect(writeMock).toHaveBeenNthCalledWith(index + 7, line);
  });

  const thirdOutput = [
    "=== CStatsDisplay info ===\n",
    "Position: OUT\n",
    "Current Tempetarute: -10\n",
    "Current Humidity: 0.7\n",
    "Current Pressure: 760\n",
    "-----------\n",
  ];

  thirdOutput.forEach((line, index) => {
    expect(writeMock).toHaveBeenNthCalledWith(index + 13, line);
  });

  writeMock.mockRestore();
});
