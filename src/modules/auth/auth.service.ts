import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { responseNotAcceptable, responseOk } from '../response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return responseNotAcceptable('아이디가 일치하지 않습니다.');
    }

    const isCorrect = await user.comparePassword(pass);
    if (!isCorrect) {
      return responseNotAcceptable('비밀번호가 일치하지 않습니다.');
    }

    const { id, name, isAdmin } = user;
    if (!isAdmin) {
      return responseNotAcceptable('관리자 아이디로 로그인해주세요.');
    }
    return responseOk({
      id,
      email,
      name,
      isAdmin,
      accessToken: this.jwtService.sign({ id, email, isAdmin }),
    });
  }
}
