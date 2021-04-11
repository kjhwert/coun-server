import { HttpModule, Module } from '@nestjs/common';
import { TalkService } from './talk.service';
import { TalkController } from './talk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talk } from '../../entities/talk/talk.entity';
import { CodeModule } from '../code/code.module';

@Module({
  imports: [TypeOrmModule.forFeature([Talk]), HttpModule, CodeModule],
  providers: [TalkService],
  controllers: [TalkController],
})
export class TalkModule {}
