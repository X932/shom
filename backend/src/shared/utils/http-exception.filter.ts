import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { parseDBMessage } from '@utils/parse-db-message';
import { getResponseMessage } from './getResponseMessage';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status: number = exception.getStatus();
    const error: string | Record<string, any> = exception.getResponse();
    let errorMessage: string;

    response.status(status);

    if (typeof error !== 'string' && Array.isArray(error.message)) {
      errorMessage = error.message.join('; ');
    } else if (typeof error === 'string') {
      errorMessage =
        parseDBMessage(error) || getResponseMessage(status) || error;
    } else {
      errorMessage = parseDBMessage(error.message) || error.message;
    }

    return response.json({
      message: errorMessage,
    });
  }
}
