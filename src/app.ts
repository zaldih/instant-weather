import { Application } from 'express';
import * as express from 'express';
import { Controller } from './shared/interfaces/controller.interface';
import { WeatherController } from './weather/weather.controller';

class App {
  app: Application;

  constructor() {
    this.init();
  }
  async init() {
    this.initExpress();
    await this.connectDb();
    this.initControllers([new WeatherController()]);
  }

  async connectDb(): Promise<any> {
    return null;
  }

  private initExpress() {
    this.app = express();
  }

  private initControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}

export default new App().app;
