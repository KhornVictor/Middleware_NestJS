import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestService } from 'src/request/request.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthenticationMiddleware.name);
  constructor(private readonly requestService: RequestService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    this.logger.log('Authenticating user... [path: authentication.middleware.ts]');
    const userId = '123';
    await this.requestService.setUserId(userId);
    next();
  }
}
