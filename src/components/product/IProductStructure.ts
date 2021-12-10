import { ObjectId } from "mongoose";
import { IImage } from "../image/IImageStructure";

export interface IProduct {
  _id?: ObjectId
  name: string;
  brand: string;
  capacity: string;
  model: string;
  type: string;
  energyConsume: string;
  images: IImage[];
  install: boolean;
  warranty: boolean;
  enterpriseId: ObjectId;
  stock: number;
  price: number;
  description: string;
  isActive: boolean;
}
