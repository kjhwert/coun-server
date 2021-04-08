import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CodeGroup } from './code-group.entity';

@Entity()
export class Code {
  static ACT = 1;
  static DELETE = 2;
  static COUNSELING_PRIVATE = 3;
  static COUNSELING_COUPLE = 4;
  static COUNSELING_FAMILY = 5;
  static COUNSELING_CHILD = 6;
  static COUNSELING_TEENAGER = 7;
  static COUNSELING_ETC = 8;
  static PLACE_DONGTAN = 9;
  static PLACE_SUWON = 10;
  static TALK_GROWTH = 11;
  static TALK_REVIEW = 12;
  static TALK_WRITE = 13;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  description: string;

  @ManyToOne(
    () => CodeGroup,
    group => group.id,
  )
  group: CodeGroup;
}
