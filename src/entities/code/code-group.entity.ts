import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CodeGroup {
  static COUNSELING_FIELD = 1;
  static COUNSELING_PLACE = 2;
  static TALK = 3;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  description: string;
}
