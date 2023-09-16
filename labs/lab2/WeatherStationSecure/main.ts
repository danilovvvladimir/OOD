import { WeatherData } from "./observable/weatherData";
import { Display } from "./observers/displays/display";
import { StatsDisplay } from "./observers/displays/statsDisplay";

const weatherData = new WeatherData();

const display = new Display();
weatherData.registerObserver(display);

const statsDisplay = new StatsDisplay();
weatherData.registerObserver(statsDisplay);

weatherData.setMeasurements(3, 0.7, 760);
weatherData.setMeasurements(4, 0.8, 761);

weatherData.removeObserver(statsDisplay);

weatherData.setMeasurements(10, 0.7, 760);
weatherData.setMeasurements(-10, 0.8, 761);
