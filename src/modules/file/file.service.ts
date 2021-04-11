import { Injectable } from '@nestjs/common';
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

  async create(userId: number, data: createFileDto) {
    try {
      const newFile = await this.fileRepository.create({
        ...data,
        createdId: userId,
      });
      await this.fileRepository.save(newFile);

      return responseOk(newFile, {}, '업로드 되었습니다.');
    } catch (e) {
      fs.unlinkSync(data.path);
      return responseNotAcceptable(e.message);
    }
  }
}
