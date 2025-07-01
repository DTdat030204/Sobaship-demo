import { Module } from '@nestjs/common';
import { EngineService } from './engine.service';
import { EngineController } from './engine.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EngineController],
  providers: [EngineService, PrismaService],
})
export class EngineModule {}
