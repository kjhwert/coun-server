import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { CommonEntity } from '../common.entity';

@Entity()
export class User extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @Column({ unique: true, length: 100 })
  email: string;

  @ApiProperty()
  @IsString()
  @Column({ length: 100 })
  password: string;

  @ApiProperty()
  @IsString()
  @Column({ length: 50 })
  name: string;

  @ApiProperty()
  @IsBoolean()
  @Column()
  isAdmin: boolean;

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
