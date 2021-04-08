import { HttpStatus } from '@nestjs/common';

export const responseOk = (data = null, paging = null, message = '') => ({
  statusCode: HttpStatus.OK,
  data,
  paging,
  message,
});

export const responseCreated = (data = {}, message = '등록 되었습니다.') => ({
  statusCode: HttpStatus.OK,
  message,
  data,
});

export const responseUpdated = (data = {}, message = '수정 되었습니다.') => ({
  statusCode: HttpStatus.OK,
  message,
  data,
});

export const responseDestroyed = (data = {}, message = '삭제 되었습니다.') => ({
  statusCode: HttpStatus.OK,
  message,
  data,
});

export const responseNotAuthorized = (
  message = '인증되지 않은 접근입니다.',
) => ({
  message,
  statusCode: HttpStatus.UNAUTHORIZED,
});

export const responseNotAcceptable = (message = '') => ({
  statusCode: HttpStatus.NOT_ACCEPTABLE,
  message,
});
