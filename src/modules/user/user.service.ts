import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user/user.entity';
import { Repository } from 'typeorm';
import { Code } from '../../entities/code/code.entity';
import { createUserDto } from '../../DTOs/user.dto';
import { responseCreated, responseNotAcceptable } from '../response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getTeachers () {
    return await this.userRepository.find({where:{isTeacher:true}, relations: ['image'], order: {id:'ASC'}})
  }

  async create(data: createUserDto) {
    try {
      const newUser = await this.userRepository.create({
        ...data,
        isAdmin: true,
      });
      await this.userRepository.save(newUser);
      return responseCreated()
    } catch (e) {
      return responseNotAcceptable(e.message)
    }
  }

  async findById(userId: number): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder()
      .where('id = :userId')
      .andWhere('status = :act')
      .setParameters({ act: Code.ACT, userId })
      .getOne();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder()
      .where('email = :email')
      .andWhere('status = :act')
      .setParameters({ act: Code.ACT, email })
      .getOne();
  }
}
