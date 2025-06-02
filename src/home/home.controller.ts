import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('/health-check')
export class HomeController {
  constructor(private service: HomeService) {}

  @Get()
  appInfo() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date(),
      serviceStatus: this.service.appInfo(),
    };
  }
}
