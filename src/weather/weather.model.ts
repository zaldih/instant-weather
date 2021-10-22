import { CACHE_TIME } from './weather.constants';

export default class Wheather {
  timestamp: number;
  expirationDate: number;
  lat: number;
  lon: number;
  hourly: any[];
  daily: any[];

  constructor(lat: number, lon: number, hourly: any[], daily: any[]) {
    const now = new Date().getTime();
    this.timestamp = now;
    this.expirationDate = this.calculateExpiration(now);
    this.lat = lat;
    this.lon = lon;
    this.hourly = hourly;
    this.daily = daily;
  }

  isValid() {}

  private calculateExpiration(timestamp: number) {
    return this.addMinutes(timestamp, CACHE_TIME);
  }

  // TODO move to other file
  private addMinutes(timestamp: number, minutes: number) {
    return timestamp + minutes * 60 * 1000;
  }
}
