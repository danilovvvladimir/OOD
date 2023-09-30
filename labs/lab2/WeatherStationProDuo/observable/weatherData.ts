import { Observable } from "./observable";

// TODO [x]:weather info не должен содержать wind info - раньше optional parametr в WeatherInfo
// Решил тем, что создал 2 версии каждого дисплея, одна работает с WeatherInfo, другая с WeatherProInfo

export interface WeatherInfo {
  temperature: number;
  humidity: number;
  pressure: number;
}

export interface WeatherProInfo extends WeatherInfo {
  windInfo: WindInfo;
}

interface WindInfo {
  speed: number;
  direction: number;
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

export class WeatherProData extends Observable<WeatherProInfo> {
  private temperature = 0.0;
  private humidity = 0.0;
  private pressure = 760.0;
  private windSpeed = 0;
  private windDirection = 0;

  protected getChangedData(): WeatherProInfo {
    return {
      humidity: this.getHumidity(),
      pressure: this.getPressure(),
      temperature: this.getTemperature(),
      windInfo: {
        direction: this.getWindDirection(),
        speed: this.getWindSpeed(),
      },
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

  getWindSpeed(): number {
    return this.windSpeed;
  }

  getWindDirection(): number {
    return this.windDirection;
  }

  public setMeasurements(
    temperature: number,
    humidity: number,
    pressure: number,
    windSpeed: number,
    windDirection: number,
  ): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.windSpeed = windSpeed;
    this.windDirection = windDirection;

    this.measurementsChanged();
  }

  public measurementsChanged(): void {
    this.notifyObservers();
  }
}
