import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('동탄가정심리상담소')
  .setDescription('동탄가정심리상담소 API 명세서')
  .setVersion('1.0.0')
  .addBearerAuth()
  .addTag('talk', '성장토크')
  .addTag('user', '회원정보')
  .addTag('interview', '인터뷰')
  .addTag('gallery', '갤러리')
  .addTag('reserve', '상담 예약')
  .addTag('code', '코드')
  .addTag('file', '파일정보')
  .build();
