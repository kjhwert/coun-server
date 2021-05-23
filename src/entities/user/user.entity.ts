import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { CommonEntity } from '../common.entity';
import { FileEntity } from '../file.entity';

@Entity()
export class User extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @Column({ unique: true, length: 100, nullable: true, select: false })
  email: string;

  @ApiProperty()
  @IsString()
  @Column({ length: 100, nullable: true, select: false })
  password: string;

  @ApiProperty()
  @IsString()
  @Column({ length: 50 })
  name: string;

  @ApiProperty()
  @IsString()
  @Column({ length: 50, nullable: true })
  grade: string;

  @ApiProperty()
  @IsString()
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty()
  @IsBoolean()
  @Column({ default: () => false, select: false })
  isAdmin: boolean;

  @ApiProperty()
  @IsBoolean()
  @Column({ default: () => false })
  isTeacher: boolean;

  @ManyToOne(
    () => FileEntity,
    file => file.id,
  )
  image: FileEntity;

  private async hashing(password: string) {
    return await bcrypt.hash(password, 10);
  }

  @BeforeInsert()
  private async hashPassword() {
    if (this.password) {
      this.password = await this.hashing(this.password);
    }
  }

  async changePassword(password: string) {
    return await this.hashing(password);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
