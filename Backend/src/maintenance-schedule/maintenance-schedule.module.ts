import { Module } from '@nestjs/common';
import { MaintenanceScheduleService } from './maintenance-schedule.service';
import { MaintenanceScheduleController } from './maintenance-schedule.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  
  controllers: [MaintenanceScheduleController],
  providers: [MaintenanceScheduleService, PrismaService],
})
export class MaintenanceScheduleModule {}
