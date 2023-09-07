import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Status } from './schedule.enum';

@Schema()
export class Schedule {
  @Prop({ required: true })
  @MaxLength(300)
  @MinLength(100)
  message: string;

  @Prop({ required: true })
  @IsEmail()
  to: string;

  @Prop({
    default: Status.PENDING,
  })
  @IsEnum(Status)
  status: Status;

  @Prop()
  @IsNumber()
  recievedAt: number;

  @Prop()
  createdBy: string;

  @Prop({ default: Date.now() })
  @IsNumber()
  createdAt: number;

  @Prop()
  updatedBy: string;

  @Prop()
  @IsNumber()
  updatedAt: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
