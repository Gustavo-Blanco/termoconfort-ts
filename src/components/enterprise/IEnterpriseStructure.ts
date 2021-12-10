import { ObjectId } from 'mongoose';

export interface IEnterprise {
  _id?:ObjectId;
  userId: ObjectId;
  name: string;
  description: string;
  image: string;
  imageKey: string;
  workers: number;
  link: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  webPage: string;
  isActive: boolean;
}