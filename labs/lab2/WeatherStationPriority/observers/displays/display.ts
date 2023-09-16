import { WeatherInfo } from "../../observable/weatherData";
import { IObserver } from "../IObserver";

export class Display implements IObserver<WeatherInfo> {
  private outputStream: NodeJS.WriteStream;

  constructor(outputStream: NodeJS.WriteStream) {
    this.outputStream = outputStream;
  }

  public update(data: WeatherInfo): void {
    this.outputStream.write("=== CStatsDisplay info ===\n");
    this.outputStream.write(`Current Tempetarute: ${data.temperature}\n`);
    this.outputStream.write(`Current Humidity: ${data.humidity}\n`);
    this.outputStream.write(`Current Pressure: ${data.pressure}\n`);
    this.outputStream.write("-----------\n");
  }
}
