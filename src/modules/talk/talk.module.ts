import { HttpModule, Module } from '@nestjs/common';
import { TalkService } from './talk.service';
import { TalkController } from './talk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talk } from '../../entities/talk/talk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Talk]), HttpModule],
  providers: [TalkService],
  controllers: [TalkController],
})
export class TalkModule {}
