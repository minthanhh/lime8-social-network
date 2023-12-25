import { ObjectId } from 'mongodb';
import mongoose, { Document } from 'mongoose';


interface IReactions {
  like: number;
  love: number;
  happy: number;
  wow: number;
  sad: number;
  angry: number;
}
export interface IPostDocument extends Document {
  _id?: string | mongoose.Types.ObjectId;
  userId: string;
  username: string;
  email: string;
  avatarColor: string;
  profilePicture: string;
  post: string;
  bgColor: string;
  commentsCount: number;
  imgVersion?: string;
  imgId?: string;
  videoId?: string;
  videoVersion?: string;
  feelings?: string;
  gifUrl?: string;
  privacy?: string;
  suggestions?: string;
  reactions?: IReactions;
  createdAt?: Date;
}

export interface IGetPostsQuery {
  _id?: ObjectId | string;
  username?: string;
  imgId?: string;
  gifUrl?: string;
  videoId?: string;
}

export interface ISavePostToCache {
  key: ObjectId | string;
  currentUserId: string;
  uId: string;
  createdPost: IPostDocument;
}

export interface IPostJobData {
  key?: string;
  value?: IPostDocument;
  keyOne?: string;
  keyTwo?: string;
}

export interface IQueryComplete {
  ok?: number;
  n?: number;
}

export interface IQueryDeleted {
  deletedCount?: number;
}
