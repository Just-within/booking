import { BookingType } from './booking';
import { PermissionType } from './permission';

export enum CourseLevelEnum {
  BASIC = 'basic',
  PROFICIENT = 'proficient',
  ADVANCED = 'advanced',
  TUTORING = 'tutoring',
}

export interface PostCourseType {
  title: string;
  level: CourseLevelEnum;
  description: string;
  startAt: Date;
  endAt: Date;
  timeZone: string;
  link: string;
  maxNumOfTeachersAllowToRegister: number;
  maxNumOfStudentsAllowToRegister: number;
  teacherEligibilityForCourseSelectionId: number;
  studentEligibilityForCourseSelectionId: number;
  fileId?: number;
}

export interface CourseType {
  id: number;
  title: string;
  level: CourseLevelEnum;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  startAt: Date;
  endAt: Date;
  timeZone: string;
  link: string;
  maxNumOfTeachersAllowToRegister: number;
  maxNumOfStudentsAllowToRegister: number;
  bookings: BookingType[];
  teacherEligibilityForCourseSelection: PermissionType[];
  studentEligibilityForCourseSelection: PermissionType[];
  // comments: CommentEntity[];
  // image: FileEntity;
}