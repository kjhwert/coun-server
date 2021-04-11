import { Controller } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('interview')
@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}
}
