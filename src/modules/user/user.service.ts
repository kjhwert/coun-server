import {
  BadRequestException,
  HttpException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user/user.entity';
import { Repository } from 'typeorm';
import { Code } from '../../entities/code/code.entity';
import { createUserDto } from '../../DTOs/user.dto';
import { responseCreated, responseNotAcceptable } from '../response';
import { AuthService } from '../../auth/auth.service';
import { LoginPayload } from '../../auth/payload/login.payload';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async index() {
    return await this.userRepository.find({
      where: { isTeacher: true },
      relations: ['image'],
      order: { id: 'ASC' },
    });
  }

  async show(id: number) {
    return await this.userRepository.findOne({
      where: { isTeacher: true, id },
      relations: ['image'],
    });
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'isAdmin'],
    });

    if (!user) {
      throw new NotAcceptableException('아이디가 일치하지 않습니다.');
    }

    const isPasswordCorrect = await user.comparePassword(pass);
    if (!isPasswordCorrect) {
      throw new NotAcceptableException('비밀번호가 일치하지 않습니다.');
    }

    if (!user.isAdmin) {
      throw new UnauthorizedException('관리자 아이디로 로그인해주세요.');
    }

    return user;
  }

  login(users: User): Promise<LoginPayload> {
    return this.authService.login(users);
  }

  async create(data: createUserDto): Promise<User> {
    try {
      const newUser = await this.userRepository.create({
        ...data,
        isAdmin: true,
      });
      return await this.userRepository.save(newUser);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { id, status: Code.ACT },
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository
      .createQueryBuilder('u')
      .select(['u.id', 'u.email', 'u.status', 'u.isAdmin'])
      .addSelect('u.password')
      .where('u.email = :email')
      .andWhere('u.status = :act')
      .setParameters({ act: Code.ACT, email })
      .getOne();
  }
}
