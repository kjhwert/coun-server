import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../../entities/file.entity';
import { Repository } from 'typeorm';
import { createFileDto } from '../../DTOs/file.dto';
import * as fs from 'fs';
import { responseNotAcceptable, responseOk } from '../response';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async show(id: number): Promise<FileEntity> {
    return await this.fileRepository.findOne(id);
  }

  async create(data: createFileDto): Promise<FileEntity> {
    try {
      const newFile = await this.fileRepository.create({
        ...data,
      });
      return await this.fileRepository.save(newFile);
    } catch (e) {
      fs.unlinkSync(data.path);
      throw new BadRequestException(e.message);
    }
  }
}
