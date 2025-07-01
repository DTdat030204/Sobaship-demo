
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
import { PrismaModule } from './prisma/prisma.module';
import { AssetsModule } from './assets/assets.module';
import { MaintenanceScheduleModule } from './maintenance-schedule/maintenance-schedule.module';
import { EngineModule } from './engine/engine.module';
import { EngineActivityLogModule } from './engine-activity-log/engine-activity-log.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    AuthModule,
    PrismaModule,
    AssetsModule,
    MaintenanceScheduleModule,
    EngineModule,
    EngineActivityLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




















































