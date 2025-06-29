import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';

@Module({
  imports: [
    PassportModule,                 
    ConfigModule,           // Cái này dùng để đọc biến trong env. 
    JwtModule.registerAsync({          // đăng kí module JWT 1 cách bất đồng bộ (vì cần đọc biến trong env thông qua ConfigService).
      imports: [ConfigModule],
      inject: [ConfigService],             // Thêm ConfigService vào trong useFactory. 
      useFactory: async (config: ConfigService) => ({            // useFactory là 1 hàm để cấu hình module JWT dựa trên giá trị trong .env. 
        secret: config.get<string>(`JWT_SECRET`)??``,
        signOptions: {
          expiresIn: config.get<string>(`JWT_EXPIRES_IN`),
        },
      }),
    }),
  ], 
  providers: [JwtStrategy],     // Đăng kí JwtStragery để chương trình sẽ hiểu khi gặp request có jwt token. 
  exports: [JwtModule],             
})
export class AuthJwtModule {}
