import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

export class CustomGlobeExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception.status;
    let message = exception.response;
    if (exception.response?.message) {
      message = exception.response.message;
    }
    response.status(200).json({
      code: statusCode,
      msg: message,
      data: null,
      success: false,
      timestamp: new Date().getTime(),
      path: request.url,
    });
  }
}
