import { Application } from 'express';
import * as express from 'express';
import { Controller } from './shared/interfaces/controller.interface';
import { WeatherController } from './weather/weather.controller';
import { HandleError } from './shared/handlers/exceptions.handler';
const db = require('./shared/database/db.controller');

class App {
  app: Application;

  constructor() {
    this.init();
  }
  async init() {
    this.initExpress();
    await this.connectDb();
    this.initControllers([new WeatherController()]);
    this.handleErrors();
  }

  async connectDb(): Promise<any> {
    return db.connect();
  }

  private initExpress() {
    this.app = express();
  }

  private initControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  // This should always be called last.
  private handleErrors() {
    this.app.use((err: any, req: any, res: any, next: any) => {
      HandleError(err, res);
    });
  }
}

export default new App().app;
