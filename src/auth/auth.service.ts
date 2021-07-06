import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async login({ id, email }: User) {
    const payload = { id, email };
    return {
      ...payload,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
