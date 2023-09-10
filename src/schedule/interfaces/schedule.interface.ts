import { Status } from '../schedule.enum';

export interface ISchedule {
  message: string;
  to: string;
  status: Status;
  recievedAt: number | null;
  createdBy: string;
  createdAt: number;
  updatedBy: string;
  updatedAt: number;
  isDeleted: boolean;
}
