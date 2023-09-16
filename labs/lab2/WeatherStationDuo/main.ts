import { WeatherData } from "./observable/weatherData";
import { Display } from "./observers/displays/display";
import { StatsDisplay } from "./observers/displays/statsDisplay";

const weatherDataIn = new WeatherData();
const weatherDataOut = new WeatherData();

// const display = new Display(weatherDataIn, weatherDataOut, process.stdout);
// weatherDataIn.registerObserver(display, 100);
// weatherDataOut.registerObserver(display, 100);

const statsDisplay = new StatsDisplay(
  weatherDataIn,
  weatherDataOut,
  process.stdout,
);

weatherDataIn.registerObserver(statsDisplay, 20);
weatherDataOut.registerObserver(statsDisplay, 20);

weatherDataIn.setMeasurements(3, 0.7, 760);
weatherDataIn.setMeasurements(3, 0.7, 770);

weatherDataOut.setMeasurements(3, 0.7, 760);

weatherDataIn.removeObserver(statsDisplay);

// Не отреагирует statsDisplay на эти изменения
weatherDataIn.setMeasurements(3, 0.7, 7160);
weatherDataIn.setMeasurements(3, 0.7, 7170);
