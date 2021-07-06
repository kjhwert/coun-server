import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { createReserveDto } from '../../DTOs/reserve.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAdminGuard } from '../../auth/guard/jwt-admin.guard';
import { Reserve } from '../../entities/reserve/reserve.entity';

@ApiTags('reserve')
@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Get()
  index(): Promise<Reserve[]> {
    return this.reserveService.index();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Get(':id')
  show(@Param('id') id: string): Promise<Reserve> {
    return this.reserveService.show(+id);
  }

  @Post()
  create(@Body() data: createReserveDto) {
    return this.reserveService.create(data);
  }
}
