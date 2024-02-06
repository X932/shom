import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { parseDBMessage } from '@utils/parse-db-message';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status: number = exception.getStatus();
    const error: string | Record<string, any> = exception.getResponse();

    response.status(status);

    if (typeof error !== 'string' && Array.isArray(error.message)) {
      const errorMessages = error.message.join('; ');

      return response.json({
        message: errorMessages,
      });
    }

    if (typeof error === 'string') {
      return response.json({
        message: parseDBMessage(error) || error,
      });
    }

    return response.json({
      message: parseDBMessage(error.message) || error.message,
    });
  }
}
