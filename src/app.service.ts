import { Injectable, Logger } from '@nestjs/common';
import { RequestService } from './request/request.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly requestService: RequestService) {}

  async getHello(): Promise<string> {
    this.logger.log("Fetching hello message... [path: app.service.ts] User ID: " + await this.requestService.getUserId());   
    return 'Hello World!';
  }
}
