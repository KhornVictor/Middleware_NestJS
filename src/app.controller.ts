import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './common/guards/auth.guard';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { FreezePipe } from './common/pipes/freeze.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(LoggingInterceptor)
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Post()
  @UseGuards(FreezePipe)
  examplePost(@Body(new FreezePipe()) body: any): any {
    body.test = '32';
  }

  @Get('error')
  throwError(): void {
    throw new InternalServerErrorException('This is a test error');
  }
}
