import { Router, NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../shared/handlers/async.handler';
import { Controller } from '../shared/interfaces/controller.interface';
import { WeatherDto } from './weather.dto';

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
        this.getWeather(req, res);
      }),
    );
  }

  private async getWeather(req: Request, res: Response) {
    const lat = +req.params.lat;
    const lon = +req.params.lon;
    const weather = await this.weatherService.getWeather(lat, lon);
    const weatherDto = new WeatherDto(weather);
    res.json(weatherDto);
  }
}
