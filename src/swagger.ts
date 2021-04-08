import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder().setTitle('동탄가정심리상담소')
  .setDescription('동탄가정심리상담소 API 명세서')
  .setVersion('1.0.0')
  .addBearerAuth()
  .addTag('user', '회원정보').build()
