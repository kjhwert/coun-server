import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const PAGE_TAKE = 12;
export const PAGE_SKIP = (page: number) => (page - 1) * PAGE_TAKE;
