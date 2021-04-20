import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from '../../entities/interview/interview.entity';
import { FileModule } from '../file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Interview]), FileModule],
  providers: [InterviewService],
  controllers: [InterviewController],
})
export class InterviewModule {}
