import { WeatherInfo } from "../../observable/weatherData";
import { IObserver } from "../IObserver";

export interface Stats {
  max: number;
  min: number;
  average: number;
}

export class StatsData {
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
      average: this.accumulated / this.accumulatedCount, // деление на 0
    };
  }
}

export class StatsDisplay implements IObserver<WeatherInfo> {
  private outputStream: NodeJS.WriteStream;
  private temperatureData: StatsData = new StatsData();
  private humidityData: StatsData = new StatsData();
  private pressureData: StatsData = new StatsData();

  constructor(outputStream: NodeJS.WriteStream) {
    this.outputStream = outputStream;
  }

  public update(data: WeatherInfo): void {
    this.temperatureData.update(data.temperature);
    this.humidityData.update(data.humidity);
    this.pressureData.update(data.pressure);

    this.prinAllStats();
  }

  private prinAllStats() {
    this.outputStream.write("=== CStatsDisplay info ===\n");
    this.printStats(this.temperatureData, "Temparature");
    this.printStats(this.humidityData, "Humidity");
    this.printStats(this.pressureData, "Pressure");
  }

  private printStats(statsData: StatsData, header: string) {
    const stats = statsData.getStats();

    this.outputStream.write(`=> ${header}\n`);
    this.outputStream.write(`Min: ${stats.min}\n`);
    this.outputStream.write(`Max: ${stats.max}\n`);
    this.outputStream.write(`Average: ${stats.average}\n`);
    this.outputStream.write("-----------\n");
  }
}
