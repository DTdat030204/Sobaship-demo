import { Injectable } from '@nestjs/common';
import { SignupDto, SigninDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service'; 

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {} 

  async signup(dto: SignupDto) {
    const hash = await bcrypt.hash(dto.password, 10);


    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        hash: hash,
      },
    });

    return {
      message: 'Đăng kí thành công.',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      return { message: `Không tìm thấy người dùng này.` };
    }
    const Checkpass = await bcrypt.compare(dto.password, user.hash);
    if (!Checkpass) {
      return { message: `Sai mật khẩu.` };
    }
    return {
      message: `Đăng nhập thành công.`,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
