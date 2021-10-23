import 'reflect-metadata';
import 'dotenv/config';
import app from './app';
import config from './shared/config';

function bootstrap() {
  const { APP_PORT } = config;
  app.listen(APP_PORT, () => {
    console.log('Server running on port', APP_PORT);
  });
}

bootstrap();
