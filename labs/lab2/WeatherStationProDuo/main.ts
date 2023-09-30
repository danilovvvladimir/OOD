import { WeatherData, WeatherProData } from "./observable/weatherData";
import { StatsDisplayPro } from "./observers/displays/statsDisplay";

const weatherDataIn = new WeatherData();
const weatherDataOut = new WeatherProData();

// const display = new Display(weatherDataIn, weatherDataOut, process.stdout);
// weatherDataIn.registerObserver(display, 100);
// weatherDataOut.registerObserver(display, 100);

const statsDisplay = new StatsDisplayPro(
  weatherDataIn,
  weatherDataOut,
  process.stdout,
);

weatherDataIn.registerObserver(statsDisplay, 100);
weatherDataOut.registerObserver(statsDisplay, 100);

// weatherDataIn.setMeasurements(3, 0.7, 760);
// weatherDataIn.setMeasurements(3, 0.7, 761);
weatherDataOut.setMeasurements(3, 0.7, 760, 4, 270);
weatherDataOut.setMeasurements(3, 0.7, 760, 10, 0);
// weatherData.setMeasurements(4, 0.8, 761);

weatherDataOut.removeObserver(statsDisplay);

weatherDataOut.setMeasurements(3, 0.7, 760, 4, 270);
weatherDataOut.setMeasurements(3, 0.7, 760, 10, 0);
