import { Injectable } from '@nestjs/common';



// Service đơn giản, đc inject vào AppController.
// Sau này sẽ viết logic xử lý dữ liệu ở đây.





@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
