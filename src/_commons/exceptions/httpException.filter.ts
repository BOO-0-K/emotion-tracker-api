import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | { message: any; statusCode: number; code: string }
      | { error: string; statusCode: 400; message: string[]; code: string }
      | { error: string; statusCode: 404; message: string[]; code: string };

    let message = null;
    let code = null;
    if (typeof err !== 'string' && err) {
      message = err.message;
      code = err.code;
    } else {
      message = err;
      code = err;
    }

    response.status(status).json({
      statusCode: status,
      code,
      message,
    });
  }
}
