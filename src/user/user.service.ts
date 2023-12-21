import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.do';
import { ConflictException } from '@nestjs/common';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ConflictException('user already exist');

    const newUser = await this.prisma.users.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password, 10),
      },
    });

    delete newUser.password;
    return newUser;
  }

  async findByEmail(email: string) {
    return await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: +id,
      },
    });

    delete user.password;
    return user;
  }
}
