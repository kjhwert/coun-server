import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Code } from '../entities/code/code.entity';

type TalkType = 11 | 12 | 13;

export class indexTalkDto {
  @ApiProperty()
  @IsString()
  page: string;

  @ApiProperty({enum:[11,12,13]})
  @IsString()
  type: TalkType;
}

export class createTalkDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  youtubeUrl?: string;

  @ApiProperty({ enum: [Code.TALK_GROWTH, Code.TALK_WRITE, Code.TALK_REVIEW] })
  @IsInt()
  @Min(Code.TALK_GROWTH)
  @Max(Code.TALK_WRITE)
  typeId: 11 | 12 | 13;
}
