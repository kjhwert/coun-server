import { ApiProperty, PickType } from '@nestjs/swagger';
import { Reserve } from '../entities/reserve/reserve.entity';
import { IsNumber } from 'class-validator';

export class createReserveDto extends PickType(Reserve, [
  'name',
  'phone',
  'reserveDate',
  'description',
  'title',
]) {
  @ApiProperty()
  @IsNumber()
  fieldId: number;

  @ApiProperty()
  @IsNumber()
  placeId: number;
}
