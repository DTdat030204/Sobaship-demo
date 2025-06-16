import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { PrismaModule } from './prisma/prisma.module'; 

// Đây là root của app.
// Tập hợp các controller và service ban đầu.
// Dùng để import các module khác.  


@Module({
  imports: [AuthModule, UsersModule, BookmarksModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
