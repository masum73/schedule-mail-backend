import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common/decorators';
import * as nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wsakib87@gmail.com',
    pass: process.env.MAIL_PASSWORD
  }
});
@Injectable()
@Processor('schedule-mail-queue')
export class ScheduleMailQueue {
  constructor(private scheduleRegistry: SchedulerRegistry) {}
  @Process('schedule-mail')
  async scheduleMail(job: Job<any>) {
    if (job.data?.schedule.hasOwnProperty('scheduleAt')) {
      setTimeout(
        () => {
          const mailOptions = {
            from: 'wsakib87@gmail.com',
            to: job.data?.schedule?.to || "",
            subject: 'Your scheduled mail',
            text: job.data?.schedule?.message
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
           console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              // do something useful
            }
          });
          console.log(mailOptions)
        },
        job.data.schedule.scheduleAt * 1000 - Date.now(),
      );
    }
  }
}
