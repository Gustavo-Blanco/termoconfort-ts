import { ObjectId } from "mongoose";
import { IComment } from "../comment/ICommentStructure";

export interface IPost {
    _id?: ObjectId
    userId: ObjectId;
    title: string;
    content: string;
    comments: IComment[]

}