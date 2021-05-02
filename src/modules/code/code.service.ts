import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Code } from '../../entities/code/code.entity';
import { Repository } from 'typeorm';
import { responseOk } from '../response';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code) private codeRepository: Repository<Code>,
  ) {}

  async index(groupId: number) {
    return await this.codeRepository.find({ where: { group: groupId } });
  }

  async show(id: number): Promise<Code> {
    return await this.codeRepository.findOne(id);
  }
}
