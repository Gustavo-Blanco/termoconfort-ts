import { ObjectId } from 'mongoose';

export interface IEnterprise {

  userId: ObjectId;
  name: string;
  description: string;
  image: string;
  workers: number;
  link: string;
  social: string[]
}