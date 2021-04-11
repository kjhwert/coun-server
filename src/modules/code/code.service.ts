import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Code } from '../../entities/code/code.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code) private codeRepository: Repository<Code>,
  ) {}

  async show(id: number): Promise<Code> {
    return await this.codeRepository.findOne(id);
  }
}
