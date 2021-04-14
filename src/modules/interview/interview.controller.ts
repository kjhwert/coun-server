import {
  Body,
  Controller,
  Get,
  Request,
  Param,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAdminGuard } from '../auth/guard/jwt-admin.guard';

@ApiTags('interview')
@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Get()
  index(@Query('page') page: number) {
    return this.interviewService.index(page);
  }

  @Get(':interviewId')
  show(@Param('interviewId') interviewId: number) {
    return this.interviewService.show(interviewId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Post()
  create(@Request() { user }, @Body() data: any) {
    return this.interviewService.create(user.id, data);
  }

  @Put(':interviewId')
  update(
    @Param('interviewId') interviewId: number,
    @Request() { user },
    @Body() data: any,
  ) {
    return this.interviewService.update(user.id, interviewId, data);
  }

  @Delete(':interviewId')
  destroy(@Param('interviewId') interviewId: number, @Request() { user }) {
    return this.interviewService.destroy(user.id, interviewId);
  }
}
