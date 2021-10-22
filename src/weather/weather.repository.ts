import { BaseRepository } from '../shared/database/base.repository';
import Wheather from './weather.model';

export class WeatherRepository extends BaseRepository<Wheather> {
  constructor() {
    super('weather');
    this.createIndex();
  }

  private createIndex() {
    return this.collection.createIndex({ lat: 1, lon: 1 });
  }
}
