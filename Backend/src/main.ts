// Nó dùng factory NestFactory (đc cung cấp bởi framework NestJs) để khởi tạo ứng dụng.
import { NestFactory } from '@nestjs/core';
// đây thì nó import module gốc - làm nơi quản lý cho các module con.
import { AppModule } from './app.module';
// cài class này để tự validate các dữ liệu gởi lên API. 
import { ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// bootstrap là hàm chạy khi app khởi động (có thể đặt tên nào cũng đc)
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Dùng cái này thì các DTO khi truyền vào sẽ tự động đc kiểm tra có đúng fornat hay ko. 
  app.useGlobalPipes(new ValidationPipe());   

  
  // Setup docs api bằng swagger. 
  const config = new DocumentBuilder()
  .setTitle('Soba Ship API')
  .setDescription('API cho Soba Ship')
  .setVersion('1.0')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);





  // 1 là chạy theo port trong env, hai là chạy trên cổng 3000. 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
