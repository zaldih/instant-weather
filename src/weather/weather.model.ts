import {
  Coordinates,
  GeoJson,
} from 'src/shared/interfaces/coordinates.interface';
import { CACHE_TIME } from './weather.constants';

export default class Wheather {
  timestamp: number;
  expirationDate: number;
  location: GeoJson;
  hourly: any[];
  daily: any[];

  constructor(coordinates: Coordinates, hourly: any[], daily: any[]) {
    const now = new Date().getTime();
    this.timestamp = now;
    this.expirationDate = this.calculateExpiration(now);
    this.location = {
      type: 'Point',
      coordinates,
    };
    this.hourly = hourly;
    this.daily = daily;
  }

  setCoordinates(lat: number, lon: number) {
    this.location.coordinates = [lon, lat];
  }

  isExpired() {
    return new Date().getTime() > this.expirationDate;
  }

  private calculateExpiration(timestamp: number) {
    return this.addMinutes(timestamp, CACHE_TIME);
  }

  // TODO move to other file
  private addMinutes(timestamp: number, minutes: number) {
    return timestamp + minutes * 60 * 1000;
  }
}
