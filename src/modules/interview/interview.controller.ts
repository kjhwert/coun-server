import {
  Body,
  Controller,
  Request,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { createInterviewDto } from '../../DTOs/interview.dto';
import { JwtAdminGuard } from '../../auth/guard/jwt-admin.guard';
import { UserDecorator } from '../../decorators/user.decorator';

@ApiTags('interview')
@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Get()
  index(@Query('page') page: string) {
    return this.interviewService.index(page);
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.interviewService.show(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Post()
  create(@Body() data: createInterviewDto, @UserDecorator() user) {
    return this.interviewService.create(user.id, data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Put(':id')
  update(
    @Body() data: createInterviewDto,
    @Param('id') id: number,
    @UserDecorator() user,
  ) {
    return this.interviewService.update(user.id, id, data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  destroy(@Param('id') id: number, @UserDecorator() user) {
    return this.interviewService.destroy(user.id, id);
  }
}
