import { BaseRepository } from '../shared/database/base.repository';
import Wheather from './weather.model';

export class WeatherRepository extends BaseRepository<Wheather> {
  constructor() {
    super('weather');
  }
}
