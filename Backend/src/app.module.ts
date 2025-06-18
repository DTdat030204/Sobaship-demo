
// Đây là root của app.
// Tập hợp các controller và service ban đầu.
// Dùng để import các module khác.


// Cái này là decorator của @Module() dùng để định nghĩa 1 module trong NestJS (App luôn có ít nhất 1 module, AppModule là root).
import { Module } from '@nestjs/common';
// Module này hỗ trợ việc load các biến môi trường từ .env.
import { ConfigModule } from '@nestjs/config'; 
// Hai cái này chĩ là cái mẫu khi tạo project thôi.
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Dưới đây là các module thật sự của app đang dùng.
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AssetsModule } from './assets/assets.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    AssetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

















































// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { BookmarksModule } from './bookmarks/bookmarks.module';
// import { PrismaModule } from './prisma/prisma.module'; 


// @Module({
//   imports: [AuthModule, UsersModule, BookmarksModule, PrismaModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}