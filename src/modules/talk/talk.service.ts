import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from '../../entities/talk/talk.entity';
import { Repository } from 'typeorm';
import { PAGE_SKIP, PAGE_TAKE } from '../common';
import {
  responseCreated,
  responseNotAcceptable,
  responseOk,
} from '../response';
import { createTalkDto, updateTalkDto } from '../../DTOs/talk.dto';
import { Code } from '../../entities/code/code.entity';

@Injectable()
export class TalkService {
  constructor(
    @InjectRepository(Talk) private talkRepository: Repository<Talk>,
    private readonly httpService: HttpService,
  ) {}

  async index(page: number) {
    const data = await this.talkRepository
      .createQueryBuilder()
      .where('status = :act', { act: Code.ACT })
      .skip(PAGE_SKIP(page))
      .take(PAGE_TAKE)
      .orderBy('id', 'DESC')
      .getMany();

    return responseOk(data);
  }

  async show(talkId: number) {
    const data = await this.talkRepository
      .createQueryBuilder()
      .where('id = :talkId', { talkId })
      .getOne();

    return responseOk(data);
  }

  async create(data: createTalkDto) {
    const { imagePage: page, imageOrder: order } = await this.talkRepository
      .createQueryBuilder()
      .orderBy('id', 'DESC')
      .getOne();

    let imagePage = page;
    let imageOrder = order + 1;
    if (imageOrder >= 10) {
      imagePage += 1;
      imageOrder = 0;
    }

    const {
      data: { results },
    } = await this.httpService
      .get(
        `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_CLIENT_ID}&query=family&page=${imagePage}`,
      )
      .toPromise();

    const thumbnail = results[imageOrder].urls.small;

    try {
      const newTalk = await this.talkRepository.create({
        ...data,
        thumbnail,
        imageOrder,
        imagePage,
      });
      await this.talkRepository.save(newTalk);

      return responseCreated();
    } catch (e) {
      return responseNotAcceptable(e.message);
    }
  }

  async update(talkId: number, adminId: number, data: updateTalkDto) {}

  async destroy(talkId: number) {}
}
