import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestService } from 'src/request/request.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(private readonly requestService: RequestService) {}

  intercept = (
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> => {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url } = request;
    this.logger.log(
      `Incoming Request... [path: logging.interceptor.ts] User Agent: ${userAgent} IP: ${ip} Method: ${method} URL: ${url} ${context.getHandler().name} invoking ...`,
    );

    void this.requestService.getUserId().then((userId) => {
      this.logger.debug(`userId: ${userId} [path: logging.interceptor.ts]`);
    });

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const contentLength = response.get('content-length');
        this.logger.log(
          `Request handled... [path: logging.interceptor.ts] User Agent: ${userAgent} IP: ${ip} Method: ${method} URL: ${url} ${context.getHandler().name} handled in ${Date.now() - now}ms`,
        );
        void this.requestService.getUserId().then((userId) => {
          this.logger.debug(
            `userId: ${userId} Response Content Length: ${contentLength} [path: logging.interceptor.ts]`,
          );
        });
      }),
    );
  };
}
