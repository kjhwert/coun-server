import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import {Response} from 'express';

@Catch(HttpException)
export class NotAcceptableFilter implements ExceptionFilter {
  //TODO return?
  catch(exception: HttpException, host: ArgumentsHost): any{

    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus();
    const message = exception.message;

    response.status(status).json({
      statusCode: status,
      message,
    })
  }
}
