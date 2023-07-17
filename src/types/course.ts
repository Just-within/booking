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