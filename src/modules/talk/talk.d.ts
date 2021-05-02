import { Talk } from '../../entities/talk/talk.entity';

export interface Talks {
  talks: Talk[],
  totalCount: number;
}