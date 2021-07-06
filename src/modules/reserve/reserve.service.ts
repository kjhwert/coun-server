import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserve } from '../../entities/reserve/reserve.entity';
import { Repository } from 'typeorm';
import { createReserveDto } from '../../DTOs/reserve.dto';
import { CodeService } from '../code/code.service';

@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(Reserve) private reserveRepository: Repository<Reserve>,
    private readonly codeService: CodeService,
  ) {}

  async index(): Promise<Reserve[]> {
    return this.reserveRepository.find({ where: { status: true } });
  }

  async show(id: number): Promise<Reserve> {
    return this.reserveRepository.findOne(id);
  }

  async create({ fieldId, placeId, ...rest }: createReserveDto) {
    try {
      const field = await this.codeService.show(fieldId);
      const place = await this.codeService.show(placeId);
      const newReserve = await this.reserveRepository.create({
        ...rest,
        field,
        place,
      });

      return await this.reserveRepository.save(newReserve);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
