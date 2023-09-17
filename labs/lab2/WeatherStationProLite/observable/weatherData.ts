import { Observable } from "./observable";

export interface WeatherInfo {
  temperature: number;
  humidity: number;
  pressure: number;

  windInfo: WindInfo;
}

export interface WindInfo {
  speed: number;
  direction: number;
}

export enum WeatherChangedEvent {
  ALL,
  TEMPERATURE,
  HUMIDITY,
  PRESSURE,
  WINDSPEED,
  WINDDIRECTION,
}

export class WeatherData extends Observable<WeatherInfo, WeatherChangedEvent> {
  private temperature = 0.0;
  private humidity = 0.0;
  private pressure = 760.0;
  private windSpeed = 0;
  private windDirection = 0;
  private currentEvents = new Set<WeatherChangedEvent>();

  protected getChangedData(): WeatherInfo {
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

  protected getCurrentEvents(): Set<WeatherChangedEvent> {
    return this.currentEvents;
  }

  private setCurrentEvents(
    temperature: number,
    humidity: number,
    pressure: number,
    windSpeed: number,
    windDirection: number,
  ) {
    this.currentEvents.clear();

    if (temperature != this.temperature) {
      this.currentEvents.add(WeatherChangedEvent.TEMPERATURE);
    }

    if (humidity != this.humidity) {
      this.currentEvents.add(WeatherChangedEvent.HUMIDITY);
    }

    if (pressure != this.pressure) {
      this.currentEvents.add(WeatherChangedEvent.PRESSURE);
    }

    if (windSpeed != this.windSpeed) {
      this.currentEvents.add(WeatherChangedEvent.WINDSPEED);
    }

    if (windDirection != this.windDirection) {
      this.currentEvents.add(WeatherChangedEvent.WINDDIRECTION);
    }

    if (this.currentEvents.size === 0) {
      this.currentEvents.add(WeatherChangedEvent.ALL);
    }
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

  public measurementsChanged(): void {
    this.notifyObservers();
  }

  public setMeasurements(
    temperature: number,
    humidity: number,
    pressure: number,
    windSpeed: number,
    windDirection: number,
  ): void {
    this.setCurrentEvents(
      temperature,
      humidity,
      pressure,
      windSpeed,
      windDirection,
    );
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.windSpeed = windSpeed;
    this.windDirection = windDirection;

    this.measurementsChanged();
  }
}
