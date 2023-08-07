import { CourseType } from './course';

export enum BookingStatusEnum {
  BOOKED = 'booked',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
}

export interface PostBookingType {
  courseId: number;
  isStudent: boolean;
}

export interface BookingType {
  id: number;
  status: BookingStatusEnum;
  sentEmail: boolean;
  isStudent: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  course: CourseType;
}