import { CommentType } from "./comment";

export interface UserType {
  id: number;
  email: string;
  password: string;
  // status: UserStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  // profile: ProfileEntity;
  comments: CommentType[]
}