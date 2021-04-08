import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TalkService } from './talk.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAdminGuard } from '../auth/guard/jwt-admin.guard';

@ApiTags('talk')
@Controller('talk')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Get()
  index() {}

  @Get(':talkId')
  show(@Param('talkId') talkId: number) {}

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Post()
  create() {}

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Put(':talkId')
  update(@Param('talkId') talkId: number) {}

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Delete(':talkId')
  destroy(@Param('talkId') talkid: number) {}
}
