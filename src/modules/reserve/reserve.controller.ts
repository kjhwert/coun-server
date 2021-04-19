import { Body, Controller, Post } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { createReserveDto } from '../../DTOs/reserve.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reserve')
@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Post()
  create(@Body() data: createReserveDto) {
    return this.reserveService.create(data);
  }
}
