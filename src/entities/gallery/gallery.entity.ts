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
  @Column({ type: 'text', nullable:true })
  description: string;

  @ApiProperty()
  @IsNumber()
  @Column({default: () => 0})
  view: number;

  @ManyToOne(
    () => FileEntity,
    file => file.id,
  )
  image: FileEntity;
}
