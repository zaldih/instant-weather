import { plainToClass } from 'class-transformer';
import { HttpService } from '../shared/services/http.service';
import { NoDataException } from './exceptions/no-data.exception';
import Wheather from './weather.model';
import config from '../shared/config';
import { WeatherRepository } from './weather.repository';
import { COORDINATES_MARGIN } from './weather.constants';
import { Coordinates } from 'src/shared/interfaces/coordinates.interface';
import { BadHourlyFormatException } from './exceptions/bad-hourly-format.exception';

export class WeatherService {
  constructor(
    private weatherRepository: WeatherRepository = new WeatherRepository(),
    private http: HttpService = new HttpService(),
  ) {}

  getWeather(lat: number, lon: number): Promise<any> {
    console.log('API');
    const API_KEY = config.OPEN_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${API_KEY}`;
    return this.http
      .get(url)
      .then((response: { data: string }) => {
        const weather = plainToClass(Wheather, response.data);
        const { lat, lon } = response.data as any;
        // TODO create plaintoclass transformer
        weather.setCoordinates(lat, lon);
        return weather;
      })
      .catch((error: any) => {
        throw new NoDataException();
      });
  }

  getWetherFromCache(lat: number, lon: number): Promise<Wheather> {
    console.log('CACHE');
    return this.weatherRepository.findOne({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lon, lat] },
          $minDistance: 0,
          $maxDistance: COORDINATES_MARGIN,
        },
      },
    }) as Promise<Wheather>;
  }

  cacheWeather(weather: Wheather) {
    // const { lat, lon } = weather.location;
    const options = { upsert: true };
    return this.weatherRepository.updateOne(
      { location: weather.location },
      weather,
      options,
    );
  }

  isValidHour(hour: number): boolean {
    const isNull = hour === null;
    const isnan = isNaN(hour);
    const isDecimal = hour % 1 != 0;
    const isInRange = hour >= 0 && hour <= 23;

    return !isNull && !isnan && !isDecimal && isInRange;
  }

  // TODO refactor: move to other file
  getTimestampForTodayAt(hour: number): number {
    const today = new Date();
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hour,
    );
    return date.getTime() / 1000;
  }

  getOneHourly(coordinates: Coordinates, timestamp: number) {
    return this.weatherRepository.findOne(
      {
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates },
            $minDistance: 0,
            $maxDistance: COORDINATES_MARGIN,
          },
        },
      },
      { projection: { hourly: { $elemMatch: { dt: timestamp } } } },
    ) as Promise<Wheather>;
  }
}
