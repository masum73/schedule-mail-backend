import { Controller, Get, Post, Body } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDTO } from './dto/create-schedule.dto';
import { ISchedule } from './interfaces/schedule.interface';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}
  @Get()
  public getSchedules(): Promise<any> {
    return this.scheduleService.findAll();
  }

  @Post()
  public createSchedule(
    @Body() createSchedule: CreateScheduleDTO,
  ): Promise<ISchedule> {
    return this.scheduleService.create(createSchedule);
  }
}
