import { Observable } from "./observable";

export interface WeatherInfo {
  temperature: number;
  humidity: number;
  pressure: number;
}

export class WeatherData extends Observable<WeatherInfo> {
  private temperature = 0.0;
  private humidity = 0.0;
  private pressure = 760.0;

  protected getChangedData(): WeatherInfo {
    return {
      humidity: this.getHumidity(),
      pressure: this.getPressure(),
      temperature: this.getTemperature(),
    };
  }

  getTemperature(): number {
    return this.temperature;
  }

  getHumidity(): number {
    return this.humidity;
  }

  getPressure(): number {
    return this.pressure;
  }

  public measurementsChanged(): void {
    this.notifyObservers();
  }

  public setMeasurements(
    temperature: number,
    humidity: number,
    pressure: number,
  ): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;

    this.measurementsChanged();
  }
}
