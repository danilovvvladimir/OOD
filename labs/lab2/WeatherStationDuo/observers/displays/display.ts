import { IObservable } from "../../observable/observable";
import { WeatherData, WeatherInfo } from "../../observable/weatherData";
import { IObserver } from "../IObserver";

export class Display implements IObserver<WeatherInfo> {
  private outputStream: NodeJS.WriteStream;
  private weatherDataIn: WeatherData;
  private weatherDataOut: WeatherData;

  constructor(
    weatherDataIn: WeatherData,
    weatherDataOut: WeatherData,
    outputStream: NodeJS.WriteStream,
  ) {
    this.weatherDataIn = weatherDataIn;
    this.weatherDataOut = weatherDataOut;
    this.outputStream = outputStream;
  }

  public update(data: WeatherInfo, observable: IObservable<WeatherInfo>): void {
    if (observable === this.weatherDataIn) {
      this.printData(data, "IN");
    }

    if (observable === this.weatherDataOut) {
      this.printData(data, "OUT");
    }
  }

  private printData(data: WeatherInfo, position: string) {
    this.outputStream.write("=== CStatsDisplay info ===\n");
    this.outputStream.write(`Position: ${position}\n`);
    this.outputStream.write(`Current Tempetarute: ${data.temperature}\n`);
    this.outputStream.write(`Current Humidity: ${data.humidity}\n`);
    this.outputStream.write(`Current Pressure: ${data.pressure}\n`);
    this.outputStream.write("-----------\n");
  }
}
