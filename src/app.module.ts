import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TalkModule } from './modules/talk/talk.module';
import { CodeModule } from './modules/code/code.module';
import { InterviewModule } from './modules/interview/interview.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.prod.env',
    }),
    FileModule,
    InterviewModule,
    TalkModule,
    UserModule,
    AuthModule,
    CodeModule,
  ],
})
export class AppModule {}
