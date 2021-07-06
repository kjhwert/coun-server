import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from '../../entities/interview/interview.entity';
import { Repository } from 'typeorm';
import { createInterviewDto } from '../../DTOs/interview.dto';
import { FileService } from '../file/file.service';
import { PAGE_SKIP, PAGE_TAKE } from '../common';
import { Code } from '../../entities/code/code.entity';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private interviewRepository: Repository<Interview>,
    private fileService: FileService,
  ) {}

  async index(page: string) {
    const [
      interviews,
      totalCount,
    ] = await this.interviewRepository.findAndCount({
      take: PAGE_TAKE,
      skip: PAGE_SKIP(+page),
      where: { status: Code.ACT },
      order: { id: 'DESC' },
      relations: ['image'],
    });

    return { interviews, totalCount };
  }

  async show(id: number): Promise<Interview> {
    return await this.interviewRepository.findOne(id);
  }

  async create(adminId: number, { imageId, ...rest }: createInterviewDto) {
    try {
      const image = await this.fileService.show(imageId);
      const newInterview = await this.interviewRepository.create({
        ...rest,
        image,
      });
      return await this.interviewRepository.save(newInterview);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async update(
    adminId: number,
    interviewId: number,
    data: createInterviewDto,
  ) {}

  async destroy(adminId: number, interviewId: number) {}
}
