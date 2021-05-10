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
import { JwtAdminGuard } from '../auth/guard/jwt-admin.guard';

@ApiTags('interview')
@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Get()
  index(@Query('page') page: string) {
    return this.interviewService.index(page);
  }

  @Get(':interviewId')
  show(@Param('interviewId') interviewId: number) {
    return this.interviewService.show(interviewId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Post()
  create(@Body() data: createInterviewDto, @Request() { user }) {
    return this.interviewService.create(user.id, data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Put(':interviewId')
  update(
    @Body() data: createInterviewDto,
    @Param('interviewId') interviewId: number,
    @Request() { user },
  ) {
    return this.interviewService.update(user.id, interviewId, data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Delete(':interviewId')
  destroy(@Param('interviewId') interviewId: number, @Request() { user }) {
    return this.interviewService.destroy(user.id, interviewId);
  }
}
