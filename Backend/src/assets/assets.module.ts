import { Module } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { AuthJwtModule } from 'src/auth/jwt.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [AuthJwtModule],
  controllers: [AssetsController],
  providers: [AssetsService, PrismaService],
})
export class AssetsModule {}
