import { Injectable } from '@nestjs/common';
import { CreateScheduleDTO } from './dto/create-schedule.dto';
import { ScheduleDTO } from './dto/schedule.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ISchedule } from './interfaces/schedule.interface';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('schedule')
    private readonly scheduleModel: Model<ISchedule>,
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

    return this.scheduleModel.create(schedule);
  }
}
