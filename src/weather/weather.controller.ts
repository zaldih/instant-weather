import { Router, NextFunction, Request, Response } from 'express';
import { Controller } from '../shared/interfaces/controller.interface';

import { WeatherService } from './weather.service';

export class WeatherController implements Controller {
  router = Router();

  constructor(private weatherService: WeatherService = new WeatherService()) {
    this.initRoutes();
  }

  private initRoutes() {}
}
