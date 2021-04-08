import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { FileEntity } from '../file.entity';

@Entity()
export class gallery extends CommonEntity {
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
  @IsNumber()
  @Column()
  view: number;

  @ManyToOne(
    () => FileEntity,
    file => file.id,
  )
  thumbnail: FileEntity;
}
