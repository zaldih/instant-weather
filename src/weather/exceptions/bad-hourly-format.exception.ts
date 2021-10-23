import { HttpException } from '../../shared/handlers/exceptions.handler';

export class BadHourlyFormatException extends HttpException {
  constructor() {
    super('Invalid format. Enter a time in the range 0-23', 400);
  }
}
