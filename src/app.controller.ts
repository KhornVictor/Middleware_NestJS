import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard } from "./common/guards/auth.guard";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";

@Controller()
export class AppController {
    
    constructor(private readonly appService: AppService) {}

    @Get()
    @UseGuards(AuthGuard)
    @UseInterceptors(LoggingInterceptor)
    async getHello(): Promise<string> {
        return this.appService.getHello();
    }
}
