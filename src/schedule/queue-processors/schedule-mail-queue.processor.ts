import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
@Processor('schedule-mail-queue')
export class ScheduleMailQueue {
  constructor(private scheduleRegistry: SchedulerRegistry) {}
  @Process('schedule-mail')
  async scheduleMail(job: Job<any>) {
    if (job.data?.schedule.hasOwnProperty('scheduleAt')) {
      setTimeout(
        () => console.log('EMAIL SENT TO'),
        job.data.schedule.scheduleAt * 1000 - Date.now(),
      );
    }
  }
}
