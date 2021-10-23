import { HttpException } from '../../shared/handlers/exceptions.handler';

export class NoDataHourlyException extends HttpException {
  constructor() {
    super('There is no data for the requested date', 404);
  }
}
