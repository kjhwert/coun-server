import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginGuard } from '../auth/guard/login.guard';
import { createUserDto, loginUserDto } from '../../DTOs/user.dto';
import { JwtAdminGuard } from '../auth/guard/jwt-admin.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LoginGuard)
  @Post('login')
  login(@Request() { user }, @Body() data: loginUserDto) {
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Post()
  create(@Body() data: createUserDto) {
    return this.userService.create(data);
  }
}
