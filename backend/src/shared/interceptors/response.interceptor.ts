import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { getResponseMessage } from '@utils/getResponseMessage';

class ResponseWrapper {
  public message: string = '';
  public payload: any;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseWrapper> {
    const { statusCode, statusMessage } = context
      .switchToHttp()
      .getResponse<Response>();

    return next.handle().pipe(
      map((data) => ({
        message: getResponseMessage(statusCode) ?? statusMessage,
        payload: data,
      })),
    );
  }
}
