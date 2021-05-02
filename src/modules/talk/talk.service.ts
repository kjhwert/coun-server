import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from '../../entities/talk/talk.entity';
import { Repository } from 'typeorm';
import { PAGE_SKIP, PAGE_TAKE } from '../common';
import {
  responseCreated,
  responseDestroyed,
  responseNotAcceptable,
  responseUpdated,
} from '../response';
import { createTalkDto, indexTalkDto } from '../../DTOs/talk.dto';
import { Code } from '../../entities/code/code.entity';
import { CodeService } from '../code/code.service';
import { Talks } from './talk';

@Injectable()
export class TalkService {
  constructor(
    @InjectRepository(Talk) private talkRepository: Repository<Talk>,
    private readonly httpService: HttpService,
    private readonly codeService: CodeService,
  ) {}

  async index({ page, type }: indexTalkDto): Promise<Talks> {
    const [talks, totalCount] = await this.talkRepository.findAndCount({
      take: PAGE_TAKE,
      skip: PAGE_SKIP(page),
      where: { type, status: Code.ACT },
      order: { id: 'DESC' },
    });
    return { talks, totalCount };
  }
  async show(talkId: number) {
    return await this.talkRepository.findOne(talkId);
  }

  async create(adminId: number, data: createTalkDto) {
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

    /** unsplash 이미지를 가져온다. */
    const {
      data: { results },
    } = await this.httpService
      .get(
        `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_CLIENT_ID}&query=family&page=${imagePage}`,
      )
      .toPromise();

    const thumbnail = results[imageOrder].urls.small;
    const { typeId, ...rest } = data;
    const type = await this.codeService.show(typeId);
    try {
      const newTalk = await this.talkRepository.create({
        ...rest,
        thumbnail,
        imageOrder,
        imagePage,
        type,
      });
      await this.talkRepository.save(newTalk);

      return responseCreated();
    } catch (e) {
      return responseNotAcceptable(e.message);
    }
  }

  async update(talkId: number, adminId: number, data: createTalkDto) {
    const { typeId, ...rest } = data;
    const type = await this.codeService.show(typeId);
    try {
      await this.talkRepository
        .createQueryBuilder()
        .update({ ...rest, type })
        .where('id = :talkId', { talkId })
        .execute();

      return responseUpdated();
    } catch (e) {
      return responseNotAcceptable(e.message);
    }
  }

  async destroy(talkId: number) {
    try {
      await this.talkRepository
        .createQueryBuilder()
        .update({ status: Code.DELETE })
        .where('id = :talkId', { talkId })
        .execute();

      return responseDestroyed();
    } catch (e) {
      return responseNotAcceptable(e.message);
    }
  }

  /** 성장토크의 모든 썸네일 이미지를 변경하는 코드 */
  async thumbnailUpdate() {
    const talks = await this.talkRepository.createQueryBuilder().getMany();

    let imagePage = 3;
    let imageOrder = 0;
    for (const { id } of talks) {
      if (imageOrder >= 10) {
        imageOrder = 0;
        imagePage++;
      }

      const {
        data: { results },
      } = await this.httpService
        .get(
          `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_CLIENT_ID}&query=family&page=${imagePage}`,
        )
        .toPromise();

      const thumbnail = results[imageOrder].urls.small;
      await this.talkRepository
        .createQueryBuilder()
        .update({ imageOrder, imagePage, thumbnail })
        .where('id = :id', { id })
        .execute();
      imageOrder++;
    }
  }
}
