import { Injectable } from '@nestjs/common';
import { CreateEngineDto } from './dto/create-engine.dto';
import { UpdateEngineDto } from './dto/update-engine.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EngineService {
  constructor(private prisma: PrismaService) {}
  create(createEngineDto: CreateEngineDto) {
    return 'This action adds a new engine';
  }

  async findAll() {
    return this.prisma.asset.findMany({
      where: {
        group: "Động cơ",
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} engine`;
  }

  update(id: number, updateEngineDto: UpdateEngineDto) {
    return `This action updates a #${id} engine`;
  }

  remove(id: number) {
    return `This action removes a #${id} engine`;
  }

  

}
