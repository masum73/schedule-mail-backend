import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleSchema } from './schedule.schema';
import { BullModule } from '@nestjs/bull';
import { ScheduleMailQueue } from './queue-processors';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'schedule', schema: ScheduleSchema }]),
    BullModule.registerQueue({
      name: 'schedule-mail-queue',
    }),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleMailQueue],
})
export class ScheduleModule {}
