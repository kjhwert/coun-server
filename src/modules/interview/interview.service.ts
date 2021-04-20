import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from '../../entities/interview/interview.entity';
import { Repository } from 'typeorm';
import { createInterviewDto } from '../../DTOs/interview.dto';
import { responseCreated, responseNotAcceptable } from '../response';
import { FileService } from '../file/file.service';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private interviewRepository: Repository<Interview>,
    private fileService: FileService,
  ) {}

  async index(page: number) {}

  async hasNextPage(page: number) {}

  async show(interviewId: number) {}

  async create(adminId: number, { thumbnailId, ...rest }: createInterviewDto) {
    try {
      const thumbnail = await this.fileService.show(thumbnailId);
      const newInterview = await this.interviewRepository.create({
        ...rest,
        thumbnail,
      });
      await this.interviewRepository.save(newInterview);

      return responseCreated();
    } catch (e) {
      return responseNotAcceptable(e.message);
    }
  }

  async update(
    adminId: number,
    interviewId: number,
    data: createInterviewDto,
  ) {}

  async destroy(adminId: number, interviewId: number) {}
}
