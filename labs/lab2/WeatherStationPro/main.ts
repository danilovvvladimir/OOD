import { WeatherData } from "./observable/weatherData";
import { Display } from "./observers/displays/display";
import { StatsDisplay } from "./observers/displays/statsDisplay";

const weatherData = new WeatherData();

const display = new Display(process.stdout);
weatherData.registerObserver(display, 100);

const statsDisplay = new StatsDisplay(process.stdout);
weatherData.registerObserver(statsDisplay, 20);

weatherData.setMeasurements(3, 0.7, 760, 4, 0);
weatherData.setMeasurements(3, 0.7, 760, 4, 270);
// weatherData.setMeasurements(4, 0.8, 761);

// weatherData.removeObserver(statsDisplay);

// weatherData.setMeasurements(10, 0.7, 760);
// weatherData.setMeasurements(-10, 0.8, 761);
