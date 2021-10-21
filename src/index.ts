import 'reflect-metadata';
import 'dotenv/config';
import app from './app';

const PORT = 1284;

function bootstrap() {
  app.listen(PORT, () => {
    console.log('Server running on port', PORT);
  });
}

bootstrap();
