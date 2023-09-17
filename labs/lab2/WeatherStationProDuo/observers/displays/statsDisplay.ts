import { IObservable } from "../../observable/observable";
import {
  WeatherData,
  WeatherInfo,
  WeatherProData,
} from "../../observable/weatherData";
import { IObserver } from "../IObserver";

export interface Stats {
  max: number;
  min: number;
  average: number;
}

class StatsData {
  private min = Number.MAX_SAFE_INTEGER;
  private max = Number.MIN_SAFE_INTEGER;
  private accumulated = 0;
  private accumulatedCount = 0;

  public update(newValue: number) {
    if (newValue < this.min) {
      this.min = newValue;
    }

    if (newValue > this.max) {
      this.max = newValue;
    }

    this.accumulated += newValue;
    this.accumulatedCount++;
  }

  public getStats(): Stats {
    return {
      max: this.max,
      min: this.min,
      average: this.accumulated / this.accumulatedCount,
    };
  }
}

class StatsWindDirectionData {
  private sinSum = 0;
  private cosSum = 0;
  private average = 0;

  public update(data: number) {
    this.sinSum += Math.sin(this.degreesToRadians(data));
    this.cosSum += Math.cos(this.degreesToRadians(data));
    const d = this.radiansToDegrees(Math.atan2(this.sinSum, this.cosSum)) + 360;
    this.average = d % 360;
  }

  public getAverageData() {
    return this.average;
  }

  private degreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }

  private radiansToDegrees(radians: number) {
    return radians * (180 / Math.PI);
  }
}

class StatsDataContainer {
  temperatureStats = new StatsData();
  humidityStats = new StatsData();
  pressureStats = new StatsData();
  windSpeedData = new StatsData();
  windDirectionData = new StatsWindDirectionData();
}

export class StatsDisplay implements IObserver<WeatherInfo> {
  private outputStream: NodeJS.WriteStream;
  private dataInContainer: StatsDataContainer;
  private dataOutContainer: StatsDataContainer;
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
    this.dataInContainer = new StatsDataContainer();
    this.dataOutContainer = new StatsDataContainer();
  }

  public update(data: WeatherInfo, observable: IObservable<WeatherInfo>): void {
    if (observable === this.weatherDataIn) {
      this.dataInContainer.temperatureStats.update(data.temperature);
      this.dataInContainer.humidityStats.update(data.humidity);
      this.dataInContainer.pressureStats.update(data.pressure);

      this.printDefaultData(this.dataInContainer, "IN");
    }

    if (observable === this.weatherDataOut) {
      this.dataOutContainer.temperatureStats.update(data.temperature);
      this.dataOutContainer.humidityStats.update(data.humidity);
      this.dataOutContainer.pressureStats.update(data.pressure);
      this.dataOutContainer.windSpeedData.update(data.windInfo.speed);
      this.dataOutContainer.windDirectionData.update(data.windInfo.direction);

      this.printProData(this.dataOutContainer, "OUT");
    }
  }

  private printStats(statsData: StatsData, header: string) {
    const stats = statsData.getStats();

    this.outputStream.write(`=> ${header}\n`);
    this.outputStream.write(`Min: ${stats.min}\n`);
    this.outputStream.write(`Max: ${stats.max}\n`);
    this.outputStream.write(`Average: ${stats.average}\n`);
    this.outputStream.write("-----------\n");
  }

  private printDefaultData(
    dataContainer: StatsDataContainer,
    position: string,
  ) {
    this.outputStream.write("=== CStatsDisplay info ===\n");
    this.outputStream.write(`Position: ${position}\n`);

    this.printStats(dataContainer.temperatureStats, "Temperature");
    this.printStats(dataContainer.humidityStats, "Humidity");
    this.printStats(dataContainer.pressureStats, "Pressure");
  }

  private printProData(dataContainer: StatsDataContainer, position: string) {
    this.outputStream.write("=== CStatsDisplay info ===\n");
    this.outputStream.write(`Position: ${position}\n`);

    this.printStats(dataContainer.temperatureStats, "Temperature");
    this.printStats(dataContainer.humidityStats, "Humidity");
    this.printStats(dataContainer.pressureStats, "Pressure");
    this.printStats(dataContainer.windSpeedData, "Wind Speed");
    this.printAverageWindDirection(
      dataContainer.windDirectionData.getAverageData(),
    );
  }

  private printAverageWindDirection(averageWindDirection: number) {
    this.outputStream.write("=> Wind Direction");
    this.outputStream.write(`Average: ${averageWindDirection}\n`);
    this.outputStream.write("-----------\n");
  }
}
