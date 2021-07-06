import { Controller, Post, UseGuards, Body, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginGuard } from '../../auth/guard/login.guard';
import { createUserDto, loginUserDto } from '../../DTOs/user.dto';
import { JwtAdminGuard } from '../../auth/guard/jwt-admin.guard';
import { UserDecorator } from '../../decorators/user.decorator';
import { User } from '../../entities/user/user.entity';
import { LoginPayload } from '../../auth/payload/login.payload';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  index(): Promise<User[]> {
    return this.userService.index();
  }

  @Get(':id')
  show(@Param('id') id: string): Promise<User> {
    return this.userService.show(+id);
  }

  @UseGuards(LoginGuard)
  @Post('login')
  login(
    @UserDecorator() user,
    @Body() data: loginUserDto,
  ): Promise<LoginPayload> {
    return this.userService.login(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Post()
  create(@Body() data: createUserDto): Promise<User> {
    return this.userService.create(data);
  }
}
