import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Status } from '../schedule.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ScheduleDTO {
  @ApiProperty({
    required: true,
  })
  @MaxLength(300)
  @MinLength(100)
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

  @IsString()
  createdBy: string;

  @IsNumber()
  createdAt: number;

  @IsString()
  updatedBy: string;

  @IsNumber()
  updatedAt: number;

  @ApiProperty({
    required: false,
    default: false,
  })
  isDeleted: boolean;
}
