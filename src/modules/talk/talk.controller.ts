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
import { JwtAdminGuard } from '../../auth/guard/jwt-admin.guard';
import { createTalkDto, indexTalkDto } from '../../DTOs/talk.dto';
import { Talks } from '../../interfaces/talk';
import { Talk } from '../../entities/talk/talk.entity';
import { UserDecorator } from '../../decorators/user.decorator';

@ApiTags('talk')
@Controller('talk')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Get()
  index(@Query() data: indexTalkDto): Promise<Talks> {
    return this.talkService.index(data);
  }

  @Get(':id')
  show(@Param('id') id: number): Promise<Talk> {
    return this.talkService.show(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Post()
  create(@Body() data: createTalkDto, @UserDecorator() user): Promise<Talk> {
    return this.talkService.create(user.id, data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Request() { user },
    @Body() data: createTalkDto,
  ) {
    return this.talkService.update(id, user.id, data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.talkService.destroy(id);
  }
}
