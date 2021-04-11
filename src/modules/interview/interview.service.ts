import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from '../../entities/interview/interview.entity';
import { Repository } from 'typeorm';
import { createInterviewDto } from '../../DTOs/interview.dto';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private interviewRepository: Repository<Interview>,
  ) {}

  async index(page: number) {}

  async hasNextPage(page: number) {}

  async show(interviewId: number) {}

  async create(adminId: number, data: createInterviewDto) {}

  async update(
    adminId: number,
    interviewId: number,
    data: createInterviewDto,
  ) {}

  async destroy(adminId: number, interviewId: number) {}
}
