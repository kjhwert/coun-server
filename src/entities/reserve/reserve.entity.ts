import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Code } from '../code/code.entity';

@Entity()
export class Reserve extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @Column({ length: 50 })
  name: string;

  @ApiProperty()
  @IsString()
  @Column({ length: 50 })
  phone: string;

  @ApiProperty()
  @IsString()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  reserveDate: Date;

  @ApiProperty()
  @IsString()
  @Column({ length: 100 })
  title: string;

  @ApiProperty()
  @IsString()
  @Column({ type: 'text' })
  description: string;

  @ManyToOne(
    () => Code,
    code => code.id,
  )
  field: Code;

  @ManyToOne(
    () => Code,
    code => code.id,
  )
  place: Code;
}
