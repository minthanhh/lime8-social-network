import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IUserDocument extends Document {
  _id: string | ObjectId;
  authId: string | ObjectId;
  username?: string;
  email?: string;
  password?: string;
  avatarColor?: string;
  uId?: string;
  postsCount: number;
  fullName: string;
  work: string;
  school: string;
  birthday?: Date;
  quote: string;
  location: string;
  blocked: mongoose.Types.ObjectId[];
  blockedBy: mongoose.Types.ObjectId[];
  followersCount: number;
  followingCount: number;
  notifications: INotificationSettings;
  social: ISocialLinks;
  bgImageVersion: string;
  bgImageId: string;
  profilePicture: string;
  relatives?: mongoose.Types.ObjectId[];
  passwordResetToken?: string;
  passwordResetExpires?: number | string;
  status?: boolean;
  createdAt?: Date;
}
export interface IBasicInfo {
  quote: string;
  work: string;
  school: string;
  location: string;
  birthday: string;
}
export interface INotificationSettings {
  messages: boolean;
  reactions: boolean;
  comments: boolean;
  follows: boolean;
}
export interface ISocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  github: string;
}
export interface ISearchUser {
  _id: string;
  profilePicture: string;
  username: string;
  email: string;
  avatarColor: string;
}

export interface ISocketData {
  blockedUser: string;
  blockedBy: string;
}
export interface ILogin {
  userId: string;
}
export interface IUserJobInfo {
  key?: string;
  value?: string | ISocialLinks;
}
export interface IUserJob {
  keyOne?: string;
  keyTwo?: string;
  key?: string;
  value?: string | INotificationSettings | IUserDocument;
}
export interface IEmailJob {
  receiverEmail: string;
  template: string;
  subject: string;
}

export interface IAllUsers {
  users: IUserDocument[];
  totalUsers: number;
}
export interface IResetPasswordParams {
  username: string;
  email: string;
  ipAddress: string;
  date: string;
}
