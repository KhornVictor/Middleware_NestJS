import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Scope,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthenticationMiddleware } from './common/middleware/authentication.middleware';
import { RequestService } from './request/request.service';
import { AuthGuard } from './common/guards/auth.guard';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { FreezePipe } from './common/pipes/freeze.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
    AuthenticationMiddleware,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'APP_INTERCEPTOR',
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    {
      provide: 'APP_PIPE',
      useClass: FreezePipe,
    },
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
