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
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: true })
  youtubeUrl: string;

  @ApiProperty()
  @IsString()
  @Column()
  thumbnail: string;

  @Column()
  imagePage: number;

  @Column()
  imageOrder: number;

  @ApiProperty()
  @IsNumber()
  @Column({ default: () => 0 })
  view: number;

  @ManyToOne(
    () => Code,
    code => code.id,
  )
  type: Code;
}
