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
import { LoginGuard } from '../../auth/guard/login.guard';
import { createUserDto, loginUserDto } from '../../DTOs/user.dto';
import { JwtAdminGuard } from '../../auth/guard/jwt-admin.guard';
import { User } from '../../decorators/user.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  index() {
    return this.userService.index();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.userService.show(+id);
  }

  @UseGuards(LoginGuard)
  @Post('login')
  login(@User() user, @Body() data: loginUserDto) {
    return this.userService.login(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Post()
  create(@Body() data: createUserDto) {
    return this.userService.create(data);
  }
}
