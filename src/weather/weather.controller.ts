import { Router, NextFunction, Request, Response } from 'express';
import { Coordinates } from 'src/shared/interfaces/coordinates.interface';
import { asyncHandler } from '../shared/handlers/async.handler';
import { Controller } from '../shared/interfaces/controller.interface';
import { BadHourlyFormatException } from './exceptions/bad-hourly-format.exception';
import { NoDataHourlyException } from './exceptions/no-data-hourly.exception';
import { WeatherDto } from './weather.dto';
import Weather from './weather.model';

import { WeatherService } from './weather.service';

export class WeatherController implements Controller {
  router = Router();

  constructor(private weatherService: WeatherService = new WeatherService()) {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      '/:lat/:lon',
      asyncHandler(async (req: Request, res: Response) => {
        await this.getWeather(req, res);
      }),
    );
    this.router.get(
      '/:lat/:lon/:hour',
      asyncHandler(async (req: Request, res: Response) => {
        await this.getWeatherHourly(req, res);
      }),
    );
  }

  private async getWeather(req: Request, res: Response) {
    const lat = +req.params.lat;
    const lon = +req.params.lon;
    const weather = await this.getAndUpdateWeather(lat, lon);
    const weatherDto = new WeatherDto(weather);
    res.json(weatherDto);
  }

  private async getWeatherHourly(req: Request, res: Response) {
    const lat = +req.params.lat;
    const lon = +req.params.lon;
    const hour = +req.params.hour;
    if (!this.weatherService.isValidHour(hour))
      throw new BadHourlyFormatException();

    const targetTimestamp = this.weatherService.getTimestampForTodayAt(hour);
    const hourlyData = await this.weatherService.getOneHourly(
      [lon, lat],
      targetTimestamp,
    );

    if (!hourlyData) {
      await this.getAndUpdateWeather(lat, lon);
      await this.getWeatherHourly(req, res);
      return;
    }

    if (!hourlyData.hourly) throw new NoDataHourlyException();
    res.json(hourlyData.hourly[0]);
  }

  private async getAndUpdateWeather(
    lat: number,
    lon: number,
  ): Promise<Weather> {
    let weather = await this.weatherService.getWetherFromCache(lat, lon);
    const shouldUpdateCache = !weather || weather.isExpired();
    if (shouldUpdateCache) {
      weather = await this.weatherService.getWeather(lat, lon);
      await this.weatherService.cacheWeather(weather);
    }
    return weather;
  }
}
