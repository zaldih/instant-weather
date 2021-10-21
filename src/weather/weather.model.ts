export default class Wheather {
  timestamp: number;
  expirationDate: number;
  lat: number;
  lon: number;
  hourly: any[];
  daily: any[];

  constructor(lat: number, lon: number, hourly: any[], daily: any[]) {
    this.timestamp = new Date().getTime();
    this.lat = lat;
    this.lon = lon;
    this.hourly = hourly;
    this.daily = daily;
  }

  isValid() {}

  private calculateExpiration() {}
}
