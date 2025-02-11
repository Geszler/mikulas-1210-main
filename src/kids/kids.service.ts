import { Injectable } from '@nestjs/common';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KidsService {
  db: PrismaService
  constructor(db: PrismaService){
    this.db = db;
  }

  create(createKidDto: CreateKidDto) {
    return this.db.kids.create({
      data: createKidDto
    })
  }

  findAll() {
    return this.db.kids.findMany(); 
  }

  async findOne(id: number) {
    return await this.db.kids.findUnique({
      where: {
        id: id
      }
    })
  }

  async update(id: number, updateKidDto: UpdateKidDto) {
    return await this.db.kids.update({
      where: {
        id: id,
      },
      data: updateKidDto
    })
  }

  remove(id: number) {
    return this.db.kids.delete({
      where: {
        id: id
      }
    })
  }
}
