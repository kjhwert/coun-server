import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TalkModule } from './modules/talk/talk.module';
import { CodeModule } from './modules/code/code.module';
import { InterviewModule } from './modules/interview/interview.module';
import { FileModule } from './modules/file/file.module';
import { ReserveModule } from './modules/reserve/reserve.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.prod.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: process.env.NODE_ENV === 'dev',
    }),
    ReserveModule,
    FileModule,
    InterviewModule,
    TalkModule,
    UserModule,
    AuthModule,
    CodeModule,
  ],
})
export class AppModule {}
