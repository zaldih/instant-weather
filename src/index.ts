import 'reflect-metadata';
import app from './app';

const PORT = 1284;

function bootstrap() {
  app.listen(PORT, () => {
    console.log('Server running on port', PORT);
  });
}

bootstrap();
