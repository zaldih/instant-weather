export class HttpException extends Error {
  constructor(message: string, private statusCode: number) {
    super();
    this.message = message;
  }
}

export const HandleError = (err: any, res: any) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
