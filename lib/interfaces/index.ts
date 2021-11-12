import { ObjectId } from "mongoose";
import { ParsedUrlQuery } from "querystring";

export interface IAward {
  _id: string | ObjectId;
  avatar: string;
  body: string;
  name: string;
  value: number;
  uri: string;
}

export interface IComment {
  _id: string | ObjectId;
  awards: IAward[];
  body: string;
  createdAt: any;
  updatedAt: any;
  uri: string;
  user: IUser;
  value: number;
}

export interface IPost {
  _id: string | ObjectId;
  awards: IAward[];
  body: string;
  comments: IComment[];
  createdAt: any;
  name: string;
  sub: ISub;
  updatedAt: any;
  uri: string;
  user: IUser;
  value: number;
}

export interface ISub {
  _id: string | ObjectId;
  avatar: string;
  background: string;
  body: string;
  createdAt: any;
  moderators: IUser[];
  name: string;
  posts: IPost[];
  rules: string[];
  updatedAt: any;
  uri: string;
}

export interface IUser {
  _id: string | ObjectId[];
  avatar: string;
  awards: IAward[];
  body: string;
  comments: IComment[];
  createdAt: any;
  email: string;
  karma: number;
  locale: string;
  name: string;
  password: string;
  posts: IPost[];
  updatedAt: any;
  uri: string;
}

export interface IParams {
  params: IPath;
}

export interface IPath extends ParsedUrlQuery {
  sub: string;
  post?: string[];
}
