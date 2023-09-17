import { WeatherInfo } from "../../observable/weatherData";
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

export class StatsDisplay implements IObserver<WeatherInfo> {
  private outputStream: NodeJS.WriteStream;
  private temperatureData: StatsData = new StatsData();
  private humidityData: StatsData = new StatsData();
  private pressureData: StatsData = new StatsData();
  private windSpeedData: StatsData = new StatsData();
  private windDirectionData: StatsWindDirectionData =
    new StatsWindDirectionData();

  constructor(outputStream: NodeJS.WriteStream) {
    this.outputStream = outputStream;
  }

  public update(data: WeatherInfo): void {
    this.temperatureData.update(data.temperature);
    this.humidityData.update(data.humidity);
    this.pressureData.update(data.pressure);
    this.windSpeedData.update(data.windInfo.speed);
    this.windDirectionData.update(data.windInfo.direction);

    this.prinAllStats();
  }

  private prinAllStats() {
    this.outputStream.write("=== CStatsDisplay info ===\n");
    this.printStats(this.temperatureData, "Temparature");
    this.printStats(this.humidityData, "Humidity");
    this.printStats(this.pressureData, "Pressure");
    this.printStats(this.windSpeedData, "Wind Speed");
    this.printAverageWindDirection(this.windDirectionData.getAverageData());
  }

  private printStats(statsData: StatsData, header: string) {
    const stats = statsData.getStats();

    this.outputStream.write(`=> ${header}\n`);
    this.outputStream.write(`Min: ${stats.min}\n`);
    this.outputStream.write(`Max: ${stats.max}\n`);
    this.outputStream.write(`Average: ${stats.average}\n`);
    this.outputStream.write("-----------\n");
  }

  private printAverageWindDirection(averageWindDirection: number) {
    this.outputStream.write("=> Wind Direction");
    this.outputStream.write(`Average: ${averageWindDirection}\n`);
    this.outputStream.write("-----------\n");
  }
}
