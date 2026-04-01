import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthenticationMiddleware } from './common/middleware/authentication.middleware';
import { RequestService } from './request/request.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RequestService, AuthenticationMiddleware],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes('*');
  }
}
