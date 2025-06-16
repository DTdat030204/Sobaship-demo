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
        hash: hash,
      },
    });

    return {
      message: 'User signed up successfully',
      data: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  async signin(dto: SigninDto) {
    return {
      message: 'User signed in successfully',
      data: {
        email: dto.email,
      },
    };
  }
}
