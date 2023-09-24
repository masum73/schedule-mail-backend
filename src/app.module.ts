import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './schedule/schedule.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/schedule-mail'),
    ScheduleModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'schedule-mail-queue',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
