import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginGuard } from '../auth/guard/login.guard';
import { createUserDto, loginUserDto } from '../../DTOs/user.dto';
import { JwtAdminGuard } from '../auth/guard/jwt-admin.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profiles')
  getProfiles() {
    return this.userService.getProfiles();
  }

  @Get('profile/:id')
  getProfile(@Param('id') id: string) {
    return this.userService.getProfile(+id);
  }

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
