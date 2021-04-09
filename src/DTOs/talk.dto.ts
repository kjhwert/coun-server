import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class updateTalkDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  youtubeUrl: string;

  @ApiProperty()
  @IsNumber()
  typeId: number;
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
}
