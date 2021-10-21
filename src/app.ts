import { Application } from 'express';
import * as express from 'express';

class App {
  app: Application;

  constructor() {
    this.init();
  }
  async init() {
    this.initExpress();
    await this.connectDb();
  }

  async connectDb(): Promise<any> {
    return null;
  }

  private initExpress() {
    this.app = express();
  }

  private initControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}

export default new App().app;
