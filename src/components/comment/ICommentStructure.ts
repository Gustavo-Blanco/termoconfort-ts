import { ObjectId } from "mongoose";

export interface IComment {
    content: string;
    userId: ObjectId
}