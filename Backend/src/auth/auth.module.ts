import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthJwtModule } from './jwt.module';
import { PrismaService } from 'src/prisma/prisma.service';



@Module({
  imports: [AuthJwtModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService]
})
export class AuthModule {}
