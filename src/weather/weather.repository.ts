import { BaseRepository } from '../shared/database/base.repository';
import Weather from './weather.model';

export class WeatherRepository extends BaseRepository<Weather> {
  constructor() {
    super('weather');
    this.createIndex();
  }

  private createIndex() {
    return this.collection.createIndex({ location: '2dsphere' });
  }
}
