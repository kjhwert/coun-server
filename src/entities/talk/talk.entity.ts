import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Code } from '../code/code.entity';

@Entity()
export class Talk extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @Column({ length: 100 })
  title: string;

  @ApiProperty()
  @IsString()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @IsString()
  @Column()
  youtubeUrl: string;

  @ApiProperty()
  @IsString()
  @Column()
  thumbnail: string;

  @ApiProperty()
  @IsNumber()
  @Column()
  view: number;

  @ManyToOne(
    () => Code,
    code => code.id,
  )
  type: Code;
}
