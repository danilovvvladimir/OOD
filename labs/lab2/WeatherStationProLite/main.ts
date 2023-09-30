import { WeatherChangedEvent, WeatherData } from "./observable/weatherData";
import { Display } from "./observers/displays/display";

const weatherData = new WeatherData();

const display = new Display(process.stdout);
weatherData.registerObserver(display, WeatherChangedEvent.HUMIDITY);
weatherData.registerObserver(display, WeatherChangedEvent.TEMPERATURE);

// Вызов 2 раза потому что и изменение температуры и влажности
weatherData.setMeasurements(3, 0.7, 760, 4, 0);

// Не среагирует на эти изменения потому что нет изменений в humidity
weatherData.setMeasurements(3, 0.7, 760, 1, 0);
weatherData.setMeasurements(3, 0.7, 760, 2, 0);
weatherData.setMeasurements(3, 0.7, 760, 3, 0);

weatherData.removeObserver(display, WeatherChangedEvent.HUMIDITY);

// Вызов 1 раз, потому что уже не привязаны к влажности, но есть изменение в температуре.
weatherData.setMeasurements(4, 1, 760, 4, 0);
