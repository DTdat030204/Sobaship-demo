// Nó dùng factory NestFactory (đc cung cấp bởi framework NestJs) để khởi tạo ứng dụng.
import { NestFactory } from '@nestjs/core';
// đây thì nó import module gốc - làm nơi quản lý cho các module con.
import { AppModule } from './app.module';
// cài class này để tự validate các dữ liệu gởi lên API. 
import { ValidationPipe } from '@nestjs/common';


// bootstrap là hàm chạy khi app khởi động (có thể đặt tên nào cũng đc)
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Dùng cái này thì các DTO khi truyền vào sẽ tự động đc kiểm tra có đúng fornat hay ko. 
  app.useGlobalPipes(new ValidationPipe());   

  // 1 là chạy theo port trong env, hai là chạy trên cổng 3000. 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
