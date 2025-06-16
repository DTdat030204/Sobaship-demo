import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';




// Đây là controller mẫu ban đầu, route thường sẽ là /
// Dùng để xử lý HTTP và xử lý các service tương ứng. 





@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
