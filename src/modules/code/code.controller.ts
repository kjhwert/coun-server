import { Controller, Get, Query } from '@nestjs/common';
import { CodeService } from './code.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('code')
@Controller('code')
export class CodeController {
  constructor(private codeService: CodeService) {}

  @Get()
  index(@Query('groupId') groupId: string) {
    return this.codeService.index(+groupId);
  }
}
