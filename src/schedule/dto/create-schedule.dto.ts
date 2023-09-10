import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Status } from '../schedule.enum';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ScheduleDTO } from './schedule.dto';

export class CreateScheduleDTO extends PartialType(ScheduleDTO) {
  @ApiProperty({
    required: true,
  })
  @MaxLength(300)
  @MinLength(2)
  message: string;

  @ApiProperty({
    required: true,
  })
  @IsEmail()
  to: string;

  @ApiProperty({
    required: false,
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @ApiProperty({
    nullable: true,
  })
  recievedAt: number | null;

  @ApiProperty({
    required: false,
    default: false,
  })
  isDeleted: boolean;
}
