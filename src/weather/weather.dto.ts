import Weather from './weather.model';

export class WeatherDto {
  hourly: any;
  daily: any;

  constructor({ hourly, daily }: Weather) {
    this.hourly = hourly;
    this.daily = daily;
  }
}
