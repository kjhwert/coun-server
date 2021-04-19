import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserve } from '../../entities/reserve/reserve.entity';
import { Repository } from 'typeorm';
import { createReserveDto } from '../../DTOs/reserve.dto';
import { CodeService } from '../code/code.service';
import { responseCreated, responseNotAcceptable } from '../response';

@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(Reserve) private reserveRepository: Repository<Reserve>,
    private readonly codeService: CodeService,
  ) {}

  async create({ fieldId, placeId, ...rest }: createReserveDto) {
    try {
      const field = await this.codeService.show(fieldId);
      const place = await this.codeService.show(placeId);
      const newReserve = await this.reserveRepository.create({
        ...rest,
        field,
        place,
      });
      await this.reserveRepository.save(newReserve);

      return responseCreated();
    } catch (e) {
      return responseNotAcceptable(e.message);
    }
  }
}
