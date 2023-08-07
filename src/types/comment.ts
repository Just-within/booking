import { CourseType } from "./course";
import { UserType } from "./user";

export interface CommentType {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  user: UserType;
  course: CourseType;
}

export interface PostCommentType {
  content: string;
  userId: number;
  courseId: number;
}