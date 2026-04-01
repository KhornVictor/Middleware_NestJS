import { Controller, Get, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard } from "./common/guards/auth.guard";

@Controller()
export class AppController {
    
    constructor(private readonly appService: AppService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getHello(): Promise<string> {
        return this.appService.getHello();
    }
}
