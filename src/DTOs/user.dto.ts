import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user/user.entity';

export class createUserDto extends PickType(User, [
  'email',
  'password',
  'name',
]) {}

export class loginUserDto extends PickType(User, ['email', 'password']) {}
