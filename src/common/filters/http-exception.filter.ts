import {
  ArgumentMetadata,
  ArgumentsHost,
  Catch,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import path from 'path';

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
      path: request.url,
      exception: exception.stack,
      filePath: path.relative(process.cwd(), __filename),
    });
  }
}
