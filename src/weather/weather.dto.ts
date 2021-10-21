import Wheather from './weather.model';

export class WeatherDto {
  hourly: any;
  daily: any;

  constructor({ hourly, daily }: Wheather) {
    this.hourly = hourly;
    this.daily = daily;
  }
}
