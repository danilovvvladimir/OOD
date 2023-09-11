import { WeatherInfo } from "../../observable/weatherData";
import { IObserver } from "../IObserver";

export class Display implements IObserver<WeatherInfo> {
  update(data: WeatherInfo): void {
    console.log("=== CDisplay info ===");
    console.log(`Current Tempetarute: ${data.temperature}`);
    console.log(`Current Humidity: ${data.humidity}`);
    console.log(`Current Pressure: ${data.pressure}`);
    console.log("----------------");
  }
}
