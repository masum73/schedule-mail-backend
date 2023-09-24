import { Injectable } from '@nestjs/common';
import { CreateScheduleDTO } from './dto/create-schedule.dto';
import { ScheduleDTO } from './dto/schedule.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ISchedule } from './interfaces/schedule.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('schedule')
    private readonly scheduleModel: Model<ISchedule>,
    @InjectQueue('schedule-mail-queue')
    private readonly scheduleMailQueue: Queue,
  ) {}

  public async findAll() {
    return [];
  }

  public async create(
    createScheduleDTO: CreateScheduleDTO,
  ): Promise<ISchedule> {
    let schedule = new ScheduleDTO();
    schedule.updatedAt = Date.now();
    schedule.updatedBy = 'Wahid Sakib';
    schedule.createdBy = 'Wahid Sakib';
    schedule = { ...schedule, ...createScheduleDTO };
    await this.scheduleMailQueue.add(
      'schedule-mail',
      {
        schedule,
      },
      {
        priority: schedule.scheduleAt,
        delay: 1000
      },
    );
    return this.scheduleModel.create(schedule);
  }
}
