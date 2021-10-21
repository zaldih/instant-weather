import { HttpException } from '../../shared/handlers/exceptions.handler';

export class NoDataException extends HttpException {
  constructor() {
    super('Information cannot be obtained at this time', 503);
  }
}
