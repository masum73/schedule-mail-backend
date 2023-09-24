import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('schedule-mail-queue')
export class ScheduleMailQueue {
  @Process('schedule-mail')
  async scheduleMail(job: Job<unknown>) {
    // use cronjob to schedule mail here
    console.log(await job.progress());
  }
}
