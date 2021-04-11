import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TalkService } from './talk.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAdminGuard } from '../auth/guard/jwt-admin.guard';
import { createTalkDto } from '../../DTOs/talk.dto';

@ApiTags('talk')
@Controller('talk')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Get()
  index(@Query('page') page: string) {
    return this.talkService.index(+page);
  }

  @Get(':talkId')
  show(@Param('talkId') talkId: number) {
    return this.talkService.show(talkId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Post()
  create(@Body() data: createTalkDto, @Request() { user }) {
    return this.talkService.create(user.id, data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Put(':talkId')
  update(
    @Param('talkId') talkId: number,
    @Request() { user },
    @Body() data: createTalkDto,
  ) {
    return this.talkService.update(talkId, user.id, data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Delete(':talkId')
  destroy(@Param('talkId') talkId: number) {
    return this.talkService.destroy(talkId);
  }
}
