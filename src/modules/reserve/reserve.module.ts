import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from '../../entities/reserve/reserve.entity';
import { CodeModule } from '../code/code.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reserve]), CodeModule],
  providers: [ReserveService],
  controllers: [ReserveController],
})
export class ReserveModule {}
