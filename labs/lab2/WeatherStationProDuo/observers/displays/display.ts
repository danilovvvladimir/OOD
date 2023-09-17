import { IObservable } from "../../observable/observable";
import {
  WeatherData,
  WeatherInfo,
  WeatherProData,
} from "../../observable/weatherData";
import { IObserver } from "../IObserver";

export class Display implements IObserver<WeatherInfo> {
  private outputStream: NodeJS.WriteStream;
  private weatherDataIn: WeatherData;
  private weatherDataOut: WeatherProData;

  constructor(
    weatherDataIn: WeatherData,
    weatherDataOut: WeatherProData,
    outputStream: NodeJS.WriteStream,
  ) {
    this.weatherDataIn = weatherDataIn;
    this.weatherDataOut = weatherDataOut;
    this.outputStream = outputStream;
  }

  public update(data: WeatherInfo, observable: IObservable<WeatherInfo>): void {
    if (observable === this.weatherDataIn) {
      this.printDefaultData(data, "IN");
    }

    if (observable === this.weatherDataOut) {
      this.printProData(data, "OUT");
    }
  }

  private printDefaultData(data: WeatherInfo, position: string) {
    this.outputStream.write("=== CStatsDisplay info ===\n");
    this.outputStream.write(`Position: ${position}\n`);
    this.outputStream.write(`Current Tempetarute: ${data.temperature}\n`);
    this.outputStream.write(`Current Humidity: ${data.humidity}\n`);
    this.outputStream.write(`Current Pressure: ${data.pressure}\n`);
    this.outputStream.write("-----------\n");
  }

  private printProData(data: WeatherInfo, position: string) {
    this.outputStream.write("=== CStatsDisplay info ===\n");
    this.outputStream.write(`Position: ${position}\n`);
    this.outputStream.write(`Current Tempetarute: ${data.temperature}\n`);
    this.outputStream.write(`Current Humidity: ${data.humidity}\n`);
    this.outputStream.write(`Current Pressure: ${data.pressure}\n`);
    this.outputStream.write(`Current Wind Speed: ${data.windInfo.speed}\n`);
    this.outputStream.write(
      `Current Wind Direction: ${data.windInfo.direction}\n`,
    );
    this.outputStream.write("-----------\n");
  }
}
