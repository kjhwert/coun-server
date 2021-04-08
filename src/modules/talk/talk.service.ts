import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from '../../entities/talk/talk.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TalkService {
  constructor(
    @InjectRepository(Talk) private talkRepository: Repository<Talk>,
  ) {}
}
